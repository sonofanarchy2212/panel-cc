import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { InformationService } from "./information.service";
import { ccDTO } from "./dto/cc.dto";

@Controller('information')
export class InformationController {
  constructor(private readonly informationService: InformationService) {}

  @Post()
  async uploadInformation(@Body() ccDTO: ccDTO) {
    return this.informationService.uploadInformation(ccDTO);
  }
  @Get()
  getInformation() {
    return this.informationService.getInformation();
  }
  @Get(':ccnum')
    getInfoByCCNum(@Param('ccnum') ccnum: string) {
        const findCC = this.informationService.getInfoByCCNum(ccnum);
        if(!findCC)
            return 'No such credit card number';
        return findCC;
    }
}