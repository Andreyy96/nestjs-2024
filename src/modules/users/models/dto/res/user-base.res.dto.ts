import { GenderEnum } from '../../enums/gender.enum';
import { CarBaseReqDto } from '../req/user-base.req.dto';

export class UserBaseResDto {
  id: string;
  name: string;
  age?: number;
  phone: string;
  email: string;
  isStudent: boolean;
  gender: GenderEnum;
  cars: CarBaseReqDto;
}
