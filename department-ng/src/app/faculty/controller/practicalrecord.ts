export interface Practicalrecord {
    practical_id:any;
    student_id:any;
    topic:string;
    file:string;
    student_name:string;
    submit_date:any;
    status:any;
    reply:any;
}
export interface Practicalresponse{
    status:number;
    message:string;
    practicalrecord:Practicalrecord[];
}
