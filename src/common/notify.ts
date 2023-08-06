import toast from "react-hot-toast";

const notifySuccess = (msg:string) => toast.success(msg);
const notifyFailure=(msg:string)=>toast.error(msg);


export {notifyFailure,notifySuccess};
