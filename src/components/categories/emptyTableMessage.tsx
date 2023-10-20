
function EmptyTableMessage({ msg }: { msg: string }) {
  return (
    <div className="w-full">
      <p className="text-center font-medium mx-auto">{msg}</p>
    </div>
  );
}

export default EmptyTableMessage;
