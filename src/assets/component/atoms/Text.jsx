const Text = ({As = 'p', children, className = ''}) => {
    const Tag = As;
    return (
        <Tag className={`text-text-primary font-[Montserrat] ${className}`} >{children}</Tag>
    )}

export default Text;