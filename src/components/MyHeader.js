const MyHeader = ({headText, leftchild, rigthtchild}) => {
  
    return (
        <header>
            <div className="head_btn_left">
                {leftchild}
            </div>
            <div className="head_text">
                {headText}
            </div>
            <div className="head_btn_right">
                {rigthtchild}
            </div>
        </header>
    );
};

export default MyHeader;