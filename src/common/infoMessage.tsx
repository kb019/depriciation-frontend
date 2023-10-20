
function InfoMessage({ message }: { message: string }) {
  return (
    <div className="flex justify-center items-center h-full text-lg text-gray-500">
      <div className="">{message}</div>
    </div>
  );
}

export default InfoMessage;
