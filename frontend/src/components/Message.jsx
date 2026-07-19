const Message = ({ variant = 'info', children }) => {
  const variantClass =
    variant === 'danger'
      ? 'alert alert--danger'
      : variant === 'success'
      ? 'alert alert--success'
      : 'alert';

  return <div className={variantClass}>{children}</div>;
};

export default Message;
