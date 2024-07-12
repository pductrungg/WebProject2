const BodyContentInner = ({children, className = ''}) => {
  return <div className={`p-3 md:p-4 xl:p-6 w-full bodyContentInner ${className}`}>{children}</div>;
};

export default BodyContentInner;
