const HeaderContentInner = ({children, className = '', hasDivider = true}) => {
  return (
    <div
      className={`px-3 py-3 md:px-4 xl:px-6 w-full headerContentInner ${
        hasDivider ? 'border-b-4 border-gray-light-7' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default HeaderContentInner;
