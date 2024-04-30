
export type ResponseFn ={
    success:boolean,
    message?:string,
    status:number,
    data?:any
}

const response = ({success,message,status}:ResponseFn)=>{
    return Response.json({success,message},{status})
}

export {response}