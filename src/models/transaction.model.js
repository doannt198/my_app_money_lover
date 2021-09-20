export default class Transaction {
    Id = '';
    AccountId = ''; // Lấy thông tin trong sessionStorage
    CategoryId = ''; // Nhóm
    WalletId = ''; // Ví nào
    Name = '';
    Amount = 0;
    CreateAt = new Date();
    ExportReport = false;
    Note = '';
    Remind = false;
    Image = '';
    Campaign = '';
    Latitue = 0;
    Longtitue = 0;
    EditByUserId = '';
    With = '';
    Metadata = '';
}