import { Injectable, ConflictException, NotFoundException, BadRequestException, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from './schemas/wallet.schema';
import { Transaction } from './schemas/transaction.schema';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { EmailService } from '../email/email.service';
import { CreatePaymentDto } from './dto/create-pay.dto';
import { ClientsService } from '../clients/clients.service';
import { CreateRechargeDto } from './dto/create-recharge.dto';
import { ConfirmarPagoDto } from './dto/confirmar-pago.dto';
import { ValidateClientDto } from 'src/clients/dto/validate-client.dto';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<Wallet>,
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    private emailService: EmailService,
    @Inject(forwardRef(() => ClientsService)) private clientsService: ClientsService,
  ) { }

  async createWallet(createWalletDto: CreateWalletDto): Promise<Wallet> {
    const existingWallet = await this.walletModel.findOne({ clientId: createWalletDto.clientId });

    if (existingWallet) {
      throw new ConflictException('La billetera ya existe para este cliente.');
    }

    const newWallet = new this.walletModel({
      clientId: createWalletDto.clientId,
      saldo: createWalletDto.saldo,
    });

    return await newWallet.save();
  }

  async rechargeWallet(createRechargeDto: CreateRechargeDto): Promise<any> {
    const wallet = await this.walletModel.findOne({ clientId: createRechargeDto.documento });

    if (!wallet) {
      throw new NotFoundException('Billetera no encontrada para el cliente.');
    }

    wallet.saldo += createRechargeDto.monto;

    const nuevaTransaccion = new this.transactionModel({
      tipo: 'recarga',
      monto: createRechargeDto.monto,
      descripcion: 'Recarga de saldo',
      fecha: new Date(),
    });

    wallet.transacciones.push(nuevaTransaccion);
    await wallet.save();

    return { message: 'Recarga realizada con éxito', saldo: wallet.saldo };
  }

  async pay(createPaymentDto: CreatePaymentDto): Promise<any> {
    // Validar el cliente usando documento y celular
    const validateClientDto: ValidateClientDto = {
      documento: createPaymentDto.documento,
      celular: createPaymentDto.celular,
    };

    const validationResponse = await this.clientsService.validateClient(validateClientDto);

    if (!validationResponse.valid) {
      throw new NotFoundException(validationResponse.message);
    }

    const wallet = await this.walletModel.findOne({ clientId: validationResponse.client.documento });

    if (!wallet || wallet.saldo <= 0) {
      throw new NotFoundException('Billetera no encontrada o saldo insuficiente.');
    }

    if (wallet.saldo < createPaymentDto.monto) {
      throw new NotFoundException('Saldo insuficiente para realizar el pago.');
    }

    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const sessionId = Math.random().toString(36).substring(2, 10);

    await this.emailService.sendTokenPay(validationResponse.client.email, token);

    wallet.pendingPayment = {
      monto: createPaymentDto.monto,
      token: token,
    };
    wallet.sessionId = sessionId;

    await wallet.save();

    return { message: 'Pago solicitado. Se ha enviado un token al correo.', sessionId: sessionId };
  }

  async confirmPayment(createPaymentDto: ConfirmarPagoDto): Promise<any> {
    const wallet = await this.walletModel.findOne({ clientId: createPaymentDto.documento });
    if (!wallet) {
      throw new NotFoundException('Billetera no encontrada.');
    }

    if (!wallet.sessionId || wallet.sessionId !== createPaymentDto.sessionId) {
      throw new BadRequestException('ID de sesión inválido.');
    }

    if (!wallet.pendingPayment ||
      wallet.pendingPayment.token !== createPaymentDto.token ||
      wallet.pendingPayment.monto !== createPaymentDto.monto) {
      throw new BadRequestException('Token o monto inválido para el pago.');
    }

    wallet.saldo -= wallet.pendingPayment.monto;

    const nuevaTransaccion = new this.transactionModel({
      tipo: 'pago',
      monto: wallet.pendingPayment.monto,
      descripcion: `Pago de ${wallet.pendingPayment.monto} unidades`,
      fecha: new Date(),
    });

    wallet.transacciones.push(nuevaTransaccion);

    wallet.pendingPayment = null;
    wallet.sessionId = null;

    await wallet.save();

    return { message: 'Pago confirmado, saldo actualizado.', saldo: wallet.saldo };
  }


  async getWalletBalance(clientId: string): Promise<any> {
    const wallet = await this.walletModel.findOne({ clientId });

    if (!wallet) {
      throw new NotFoundException('Billetera no encontrada para el cliente.');
    }

    return { saldo: wallet.saldo, transacciones: wallet.transacciones };
  }

}
