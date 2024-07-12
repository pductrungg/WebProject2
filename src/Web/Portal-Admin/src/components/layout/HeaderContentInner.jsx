const HeaderContentInner = ({children, className = '', hasDivider = true}) => {
  return (
    <div
      className={`p-3 md:p-4 xl:p-6 w-full headerContentInner ${
        hasDivider ? 'border-b-4 border-gray-light-7' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default HeaderContentInner;
