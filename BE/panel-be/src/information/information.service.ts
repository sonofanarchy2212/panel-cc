import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ccDTO } from "./dto/cc.dto";
import { Cc } from "src/schema/Cc.schema";

@Injectable()
export class InformationService {
    constructor(@InjectModel(Cc.name) private ccModel: Model<Cc>) {}

    uploadInformation(ccDTO: ccDTO) {
        const cc = new this.ccModel(ccDTO);
        return cc.save();
    }

    getInformation() {
        return this.ccModel.find();
    }
    getInfoByCCNum(ccnum: string) {
        return this.ccModel.findById(ccnum);
    }
}
