import './style.css';

const Rect = ({ marg, rect }) => {

    const checkColor = () => {
        if (rect.isSorted || rect.isSorting) {
            return "#00f7ef"; // glowing cyan when sorting/arranged
        } else {
            return "white"; // default before visualization
        }
    }

    return (
        <div
            className='rect'
            style={{
                height: rect.width,
                background: checkColor(),
                boxShadow: (rect.isSorted || rect.isSorting) ? '0 0 14px rgba(0,247,239,0.32)' : 'none',
                margin: marg,
                // float:'left',
                verticalAlign: 'middle'
            }}
        >
        </div>
    );


}

export default Rect;