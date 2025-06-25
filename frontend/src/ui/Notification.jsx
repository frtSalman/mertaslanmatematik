function Notification({ note }) {
  return (
    <div className="flex flex-col items-center justify-start h-[70px]">
      <h2>Görünüşe bakılırsa sistemsel bir hata oluştu. 😬</h2>
      <div>
        <span className="font-semibold text-red-600">Hata:</span>
        <span className="px-2 text-red-300">{note}.</span>
      </div>
    </div>
  );
}

export default Notification;
