interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-black text-white relative text-2xl"
                style={{
                    border: '1px solid white',
                    width: '60%',
                    height: '60%',
                    fontFamily: 'Bit9x9'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with title and close button */}
                <div
                    className="flex justify-between items-center"
                    style={{
                        //borderBottom: '1px solid white',
                        fontFamily: 'Bit9x9',
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        paddingTop: '16px',
                        paddingBottom: '16px'
                    }}
                >
                    <h2 style={{ fontFamily: 'Bit9x9' }}>
                        ABOUT
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-white"
                        style={{
                            fontFamily: 'Bit9x9',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px 8px'
                        }}
                        onMouseEnter={(e) => {
                            const target = e.target as HTMLButtonElement;
                            target.style.background = 'white';
                            target.style.color = 'black';
                        }}
                        onMouseLeave={(e) => {
                            const target = e.target as HTMLButtonElement;
                            target.style.background = 'transparent';
                            target.style.color = 'white';
                        }}
                    >
                        X
                    </button>
                </div>

                {/* Modal content */}
                <div style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '24px', paddingBottom: '24px' }}>
                    <span style={{ fontFamily: 'Bit9x9', backgroundColor: 'white', color: 'black', display: 'inline-block', paddingTop: '4px', paddingBottom: '4px' }}>
                        CONTROLS:
                    </span>
                    <br />Use W and S keys for left paddle
                    <br /> Use up and down arrow keys for right paddle.
                    <br />
                    <span style={{ fontFamily: 'Bit9x9', backgroundColor: 'white', color: 'black', display: 'inline-block', paddingTop: '4px', paddingBottom: '4px' }}>
                        CREATED BY:
                    </span>
                    <br />
                               <a 
             href="https://andrew-boylan.com" 
             target="_blank" 
             rel="noopener noreferrer" 
             style={{ color: 'white', cursor: 'pointer', fontFamily: 'Bit9x9', display: 'inline-block', paddingTop: '4px', paddingBottom: '4px' }}
                        onMouseEnter={(e) => {
                            const target = e.target as HTMLAnchorElement;
                            target.style.background = 'white';
                            target.style.color = 'black';
                        }}
                        onMouseLeave={(e) => {
                            const target = e.target as HTMLAnchorElement;
                            target.style.background = 'transparent';
                            target.style.color = 'white';
                        }}
                    >
                        andrew-boylan.com
                    </a>
                </div>
            </div>
        </div>
    );
} 