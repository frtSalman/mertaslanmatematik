function Spinner() {
  return (
    <div className="flex items-center justify-center w-full h-full backdrop-blur-sm">
      <div
        className="h-20 w-20 animate-spin rounded-full border-6 border-solid border-current border-r-transparent  text-orange-500 motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
    </div>
  );
}

export default Spinner;
