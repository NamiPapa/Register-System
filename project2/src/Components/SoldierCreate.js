import React, { Component } from "react";
import { connect } from "react-redux";
import { createSoldier } from "../Redux/action_creaters";
import TextField from "@material-ui/core/TextField";
import MenutItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import avatar1 from "../images/avatar1.jpg";
import avatar2 from "../images/avatar2.jpeg";
import avatar3 from "../images/avatar3.jpeg";
import avatar4 from "../images/avatar4.jpeg";
import avatar5 from "../images/avatar5.png";
import avatar6 from "../images/avatar6.jpeg";
import avatar7 from "../images/avatar7.jpeg";
import { Redirect } from "react-router-dom";

class SoldierCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: avatar1,
            name: "",
            rank: "",
            sex: "",
            startDate: "",
            phone: "",
            email: "",
            superiorID: "",
            superiorName: ""
        };
    }
    handleAvatar = e => {
        this.setState({ avatar: e.target.value });
    };
    handleName = e => {
        this.setState({ name: e.target.value });
    };
    handleRank = e => {
        this.setState({ rank: e.target.value });
    };
    handleGender = e => {
        this.setState({ sex: e.target.value });
    };
    handleDate = e => {
        this.setState({ startDate: e.target.value });
    };
    handlePhone = e => {
        this.setState({ phone: e.target.value });
    };
    handleEmail = e => {
        this.setState({ email: e.target.value });
    };
    handleSuperior = e => {
        this.setState({
            superiorID: e.target.value
        });
    };
    handleCancel = () => {
        this.props.history.push("/");
    };
    handleSave = () => {
        let newSoldier = {
            avatar: this.state.avatar,
            name: this.state.name,
            sex: this.state.sex,
            rank: this.state.rank,
            startDate: this.state.startDate,
            phone: this.state.phone,
            email: this.state.email,
            superiorID: this.state.superiorID
        };
        const {
            page,
            sort,
            searchContent,
            type,
            superior
        } = this.props;
        this.props.createSoldier(
            newSoldier,
            page,
            sort.asc,
            sort.sortby,
            searchContent,
            type,
            superior
        );
    };
    render() {
        var avatar = null;
        switch (this.state.avatar) {
            case "C:\\fakepath\\avatar1.jpg":
                avatar = avatar1;
                break;
            case "C:\\fakepath\\avatar2.jpeg":
                avatar = avatar2;
                break;
            case "C:\\fakepath\\avatar3.jpeg":
                avatar = avatar3;
                break;
            case "C:\\fakepath\\avatar4.jpeg":
                avatar = avatar4;
                break;
            case "C:\\fakepath\\avatar5.png":
                avatar = avatar5;
                break;
            case "C:\\fakepath\\avatar6.jpeg":
                avatar = avatar6;
                break;
            case "C:\\fakepath\\avatar7.jpeg":
                avatar = avatar7;
                break;
            default:
                avatar = avatar1;
        }
        const { name, rank, sex, startDate, phone, email } = this.state;
        const valid = name && rank && sex && startDate && phone && email;
        return (
            <div style={{ display: "flex" }}>
                <div>{this.props.error ? this.props.error : null}</div>
                {this.props.finished ? (
                    <Redirect to={{ pathname: "/" }} />
                ) : null}
                <div style={{ margin: "auto" }}>
                    <div>
                        <h3>New Soldier</h3>
                    </div>
                    <div>
                        <div>
                            <img
                                src={avatar}
                                style={{ height: "200px", width: "200px" }}
                                alt="null"
                            />
                        </div>
                        <div>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                accept="image/*"
                                onChange={this.handleAvatar}
                                id="image-upload"
                                multiple
                            />
                            <label htmlFor="image-upload">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                >
                                    Uplaod Avatar
                                </Button>
                            </label>
                        </div>
                        <div>
                            <div>
                                <TextField
                                    required
                                    label="Name"
                                    onChange={this.handleName}
                                />
                            </div>
                            <div>
                                <TextField
                                    required
                                    select
                                    label="Rank"
                                    value={this.state.rank}
                                    onChange={this.handleRank}
                                    helperText="Please Select Rank"
                                >
                                    <MenutItem value="General">
                                        General
                                    </MenutItem>
                                    <MenutItem value="Colonel">
                                        Colonel
                                    </MenutItem>
                                    <MenutItem value="Major">Major</MenutItem>
                                    <MenutItem value="Captain">
                                        Captain
                                    </MenutItem>
                                    <MenutItem value="Lieutenant">
                                        Lieutenant
                                    </MenutItem>
                                    <MenutItem value="Warrant Officer">
                                        Warrant Officer
                                    </MenutItem>
                                    <MenutItem value="Sergeant">
                                        Sergeant
                                    </MenutItem>
                                    <MenutItem value="Corporal">
                                        Corporal
                                    </MenutItem>
                                    <MenutItem value="Specialist">
                                        Specialist
                                    </MenutItem>
                                    <MenutItem value="Private">
                                        Private
                                    </MenutItem>
                                </TextField>
                            </div>

                            <div style={{ padding: "10px" }}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend" required>
                                        Gender
                                    </FormLabel>
                                    <RadioGroup
                                        aria-label="gender"
                                        name="gender1"
                                        value={this.state.sex}
                                        onChange={this.handleGender}
                                    >
                                        <FormControlLabel
                                            value="Female"
                                            control={<Radio />}
                                            label="Female"
                                        />
                                        <FormControlLabel
                                            value="Male"
                                            control={<Radio />}
                                            label="Male"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div>
                                <TextField
                                    label="Join Date"
                                    type="date"
                                    defaultValue="2000-01-01"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    onChange={this.handleDate}
                                />
                            </div>
                            <div>
                                <TextField
                                    required
                                    label="Office Phone"
                                    onChange={this.handlePhone}
                                >
                                    Office Phone
                                </TextField>
                            </div>
                            <div>
                                <TextField
                                    required
                                    label="Email"
                                    onChange={this.handleEmail}
                                >
                                    Email
                                </TextField>
                            </div>
                            <div>
                                <TextField
                                    select
                                    label="Superior"
                                    value={this.state.superiorID}
                                    onChange={this.handleSuperior}
                                    helperText="Please Select Superior"
                                >
                                    {this.props.options ? (
                                        this.props.options.map(
                                            (item, index) => {
                                                return (
                                                    <MenutItem
                                                        key={index}
                                                        value={item._id}
                                                    >
                                                        {item.name}
                                                    </MenutItem>
                                                );
                                            }
                                        )
                                    ) : (
                                        <MenutItem value="" />
                                    )}
                                </TextField>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}
                            >
                                <div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleCancel}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={!valid}
                                        onClick={this.handleSave}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    page: state.list.page,
    type: state.list.type,
    searchContent: state.list.searchContent,
    sort: state.list.sort,
    superior: state.list.superiorID,
    totalList: state.list.totalList,
    finished: state.soldier.createFinished,
    options: state.soldier.options,
    error: state.soldier.createError
});

const mapDispatchToProps = dispatch => ({
    createSoldier: (
        soldier,
        page,
        sort,
        sortby,
        searchContent,
        type,
        superiorID
    ) =>
        dispatch(
            createSoldier(
                soldier,
                page,
                sort,
                sortby,
                searchContent,
                type,
                superiorID
            )
        )
});
export default connect(mapStateToProps, mapDispatchToProps)(SoldierCreate);
