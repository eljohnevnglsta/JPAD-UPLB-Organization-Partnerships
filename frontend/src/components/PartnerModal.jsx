
function PartnerModal(props) {
    const handleClose = (e) => {
        e.preventDefault(); // prevent form submission when closing
        props.onClose(); // close the modal
    };

    const handleSubtmit = (e) => {
        // handle the submitting 

        props.onClose(); 
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="partnership-request-header">Partnership Request</h2>
                <form className="partnership-form">
                    <label className="partnership-form-title">
                        Title:
                        <input type="text" name="title" title="Please enter a title" required />
                    </label>
                    <label className="partnership-form-body">
                        Body:
                        <textarea name="body" title="Please enter body content" required />
                    </label>
                    <label className="partnership-form-type">
                        Partnership Type:
                        <input type="text" name="partnership-type" />
                    </label>
                    <label className="partnership-form-upload">
                        Attachment:
                        <input type="file" id="file-upload" />
                    </label>
                </form>
                <button className="btn-close" type="button" onClick={handleClose}>Close</button> 
                <button className="btn-submit" type="submit" onClick={handleSubtmit}>Send Request</button>
            </div>
        </div>
    );
}

export default PartnerModal;
