export class User {
    Office:Office;
    OfficeId:number;
    RoleId:string;
    RoleName:any;
    KHB_UserId:number;
    UserName:string;
    Password:string;
    ConfirmPassword:string;
    oldPassword:any;
    NewPassword:any;
    confirmPassword:any;
    
}

export class Register {
    // UserName:string;
    FirstName:string;
    LastName:string;
    PhoneNumber:number;
    Address:any;
    Email:string;
    District:string;
    State:string;
    Password:string;
    DistrictId:any;
}

export class Login {
    UserName:string;
    Password:string;
}
export class Office {
    OfficeId:number;
    OfficeCode:string;
    OfficeName:string;
    OfficeType:string;
    Address:string;
    pincode:string;
    TinNo:string;
    Email:string;
    PhoneNumber:number;
}

export class Search{
    SearchCriteria:string;
    SearchText:string;
    SearchRows:number;
    SearchCriteriap:any;
    SearchTextp:any;
}
export class Search1{
    SearchCriteria1:string;
    SearchText1:string;
    SearchRows1:number;
}

export class Password{
    oldPassword:any;
    NewPassword:any;
    confirmPassword:any;
}


export class Application {
    ApplicationNo: any;
    RegNo: any;
    FormType: any;
    PropertyType: any;
    ApplicantImage: any;
    DistrictCode: any;
    DistrictName: string;
    ProjectPlace: string;
    NotificationNo: any;
    ApplicantName: string;
    DateofBirth: any;
    Age: any;
    Gender: any;
    GuardianName: any;
    Address: any;
    TelephoneNumber: any;
    MobileNumber: any;
    Email: any;
    Category: any;
    AnnualIncome: any;
    ItPanNo: any;
    BankName: any;
    AccountNumber: any;
    IFSCCode: any;
    SiteDetails: any;
}

export class Project {
    PD_Id: any;
    PD_Project_Name: string;
    Phase_Name: string;
    Sch_Name: string;
    DI_District: string;
    TotalProperties: any;
    Available: any;
    Blocked: any;
    PropNo: any;
    CA_CategoryName: any;
    CA_Id: any;
}

export class DirectAllotment {
    PD_Id: any;
    PD_Project_Name: string;
    Phase_Name: string;
    Sch_Name: string;
    DI_District: string;
    TotalProperties: any;
    Available: any;
    Blocked: any;
    PropNo: any;
    CA_CategoryName: any;
    CA_Id: any;
    Note:any;
    Date:any;
    RegNo:any;
    PaymentDueDate: any;
    PaymentAmount: any;
}

export class SearchProject_MF{
    app_no:string;  
    property_no:string;  
}