import { BadRequestException, Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { InformationService } from "./information.service";
import { ccDTO } from "./dto/cc.dto";

@Controller('information')
export class InformationController {
  constructor(private readonly informationService: InformationService) { }

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
    if (!findCC)
      return 'No such credit card number';
    return findCC;
  }

  @Get(':bin')
  getInfoByBin(@Param('bin') bin: string) {
    const findCC = this.informationService.getInfoByBin(bin);
    if (!findCC)
      return 'No such credit card number';
    return findCC;
  }
  @Get('checkbin/:listBin')
  async getInfoByListBin(@Param('listBin') listBin: string) {
    const binArray = listBin.split(',');

    if (!binArray || binArray.length === 0) {
      throw new BadRequestException('List of BINs cannot be empty');
    }

    const findCC = await this.informationService.getInfoByListBin(binArray);
    if (!findCC || findCC.length === 0) {
      return { message: 'No such credit card number' };
    }

    return findCC;
  }
  @Put('updateNote')
  async updateNote(@Body() data: { note: string, id: string }) {
    return this.informationService.updateNoteById(data.id, data.note);
  }
  @Put('updateUsed')
  async updateUsed(@Body() data: { id: string, used: boolean}) {
    return this.informationService.updateIsUsedById(data.id, data.used);
  }
}