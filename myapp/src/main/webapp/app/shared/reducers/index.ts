import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import customer, {
  CustomerState
} from 'app/entities/customer/customer.reducer';
// prettier-ignore
import vip, {
  VipState
} from 'app/entities/vip/vip.reducer';
// prettier-ignore
import room, {
  RoomState
} from 'app/entities/room/room.reducer';
// prettier-ignore
import roomType, {
  RoomTypeState
} from 'app/entities/room-type/room-type.reducer';
// prettier-ignore
import bill, {
  BillState
} from 'app/entities/bill/bill.reducer';
// prettier-ignore
import receipt, {
  ReceiptState
} from 'app/entities/receipt/receipt.reducer';
// prettier-ignore
import payed, {
  PayedState
} from 'app/entities/payed/payed.reducer';
// prettier-ignore
import storage, {
  StorageState
} from 'app/entities/storage/storage.reducer';
// prettier-ignore
import subBill, {
  SubBillState
} from 'app/entities/sub-bill/sub-bill.reducer';
// prettier-ignore
import subBillGood, {
  SubBillGoodState
} from 'app/entities/sub-bill-good/sub-bill-good.reducer';
// prettier-ignore
import card, {
  CardState
} from 'app/entities/card/card.reducer';
// prettier-ignore
import printInfo, {
  PrintInfoState
} from 'app/entities/print-info/print-info.reducer';
// prettier-ignore
import booking, {
  BookingState
} from 'app/entities/booking/booking.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly customer: CustomerState;
  readonly vip: VipState;
  readonly room: RoomState;
  readonly roomType: RoomTypeState;
  readonly bill: BillState;
  readonly receipt: ReceiptState;
  readonly payed: PayedState;
  readonly storage: StorageState;
  readonly subBill: SubBillState;
  readonly subBillGood: SubBillGoodState;
  readonly card: CardState;
  readonly printInfo: PrintInfoState;
  readonly booking: BookingState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  customer,
  vip,
  room,
  roomType,
  bill,
  receipt,
  payed,
  storage,
  subBill,
  subBillGood,
  card,
  printInfo,
  booking,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
