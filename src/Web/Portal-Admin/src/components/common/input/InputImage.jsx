const InputImage = ({
  className = '',
  labelClassName = '',
  inputClassName = '',
  onChange = () => {},
  ...props
}) => {
  return (
    <div
      className={`w-20 h-20 rounded-md border-2 border-dashed hover:border-primary flex items-center justify-center ${className}`}
    >
      <label
        className={`w-full h-full relative hover:cursor-pointer flex flex-col items-center justify-center ${labelClassName}`}
      >
        <input
          type="file"
          name="images"
          accept="image/png, image/jpeg"
          onChange={onChange}
          className={`absolute -z-10 opacity-0 ${inputClassName}`}
          {...props}
        />
        <div>
          <i className="fa fa-cloud-upload fa-2x text-primary" aria-hidden="true"></i>
        </div>
        <div>Chọn ảnh</div>
      </label>
    </div>
  );
};

const PreviewImage = ({
  src = '',
  className = '',
  imgClassName = '',
  handleRemove = () => {},
  ...props
}) => {
  return (
    <div
      className={`w-20 h-20 p-2 rounded-md border-2 border-dashed flex items-center justify-center relative ${className}`}
    >
      <div className="w-full h-full overflow-hidden">
        <img src={src} alt="" className={`w-full max-h-full ${imgClassName}`} />
      </div>
      <div className="absolute -top-3 -right-2 cursor-pointer z-[5]" onClick={handleRemove}>
        <i className="fa fa-times-circle fa-lg" aria-hidden="true"></i>
      </div>
    </div>
  );
};

export {InputImage, PreviewImage};
