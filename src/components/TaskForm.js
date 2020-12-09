import react, {Component} from 'react';

class TaskForm extends Component {
    //Khai báo constructor để lưu dữ liệu
    constructor(props) {
      super(props);
    
      this.state = {
        id : '',
        name : '',
        status : false
      };
    }

    componentDidMount(){
        if (this.props.task) {
            this.setState({
                id : this.props.task.id,
                name : this.props.task.name,
                status : this.props.task.status
            });
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps && nextProps.task) {
            this.setState({
                id : nextProps.task.id,
                name : nextProps.task.name,
                status : nextProps.task.status
            });
        }
    }

    //Đóng mở form
    onClose = () => {
        this.props.onCloseForm();
    }

    //lấy dữ liệu của form
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        //ep kieu du lieu sang boolean va truyen sang app.js
        if (name === 'status') {
            value = JSON.parse('true') ? true : false;
        }
        this.setState({
            [name] : value
        });
    }

    //khi nguoi dung submit du lieu
    onSubmit = (event) => {
        //bo submit mac dinh
        event.preventDefault();
        //truyen du lieu
        this.props.onSubmit(this.state);
        //huy va dong form
        this.onClear();
        this.onClose();
    }

    //Them xong du lieu thi se xoa va dong thoi dong form
    onClear = () => {
        this.setState({
            name : '',
            status : false
        });
    }

  render() {
    var { id } = this.state;
      return (
            <div className="panel panel-warning">
                    <div className="panel-heading">
                    <h3 className="panel-title">
                        { id !== ''? 'Cập nhật công việc' : 'Thêm công việc' } 
                        <span 
                            className="fa fa-times-circle text-right close"
                            onClick={ this.onClose }
                        ></span>
                    </h3>
                    </div>

                <div className="panel-body">
                    <form onSubmit={this.onSubmit} >
                        <div className="form-group">
                            <label>Tên :</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select 
                                className="form-control" 
                                name="status"
                                value={this.state.status}
                                onChange={this.onChange}
                            >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                            <button 
                                type="button"
                                className="btn btn-danger"
                                onClick={this.onClear}
                            >
                                Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
            );
        }
    }

export default TaskForm;
