const Row = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className=" rounded-md  p-2 bg-white w-72 mb-4 md:mr-4">
      <div className="font-bold text-center mb-2 border-b pb-2">{title}</div>
      {children}
    </div>
  );
};

export default Row;
