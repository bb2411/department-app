export interface Practical {
    status:number;
    practicallist:Practicallist[];
    practicalsubmitted:PracticalStudent[];
    message:any;
}
export interface Practicallist{
    desciption:string;
    id:number;
    date:string;
    faculty:string;
    subject:string;
}
export interface PracticalStudent{
    practical_id:any;
    code_file:Blob;
    submit_date:string;
}