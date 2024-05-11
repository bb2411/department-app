export interface Attandance {
    message:string;
    status:number;
    lectures:lecture[];
    attandance:attandancerow[];
}
export interface lecture{
    id:number;
    date:string;
    topic:string;
    subject_name:string;
    faculty_name:string;
}
export interface attandancerow{
    id:any;
    status:any;
    date:string;
    subject_name:string;
    topic:string;
    faculty_name:string;
}
