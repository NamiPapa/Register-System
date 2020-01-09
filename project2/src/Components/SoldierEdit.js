import React, { Component } from "react";
import {
    editAvatar,
    editName,
    editRank,
    editSex,
    editDate,
    editPhone,
    editEmail,
    editSuperiorID,
    editSuperiorName,
    editSoldier
} from "../Redux/action_creaters";
import { connect } from "react-redux";
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

class SoldierEdit extends Component {
    handleAvatar = e => {
        this.props.editAvatar(e.target.value);
    };
    handleName = e => {
        this.props.editName(e.target.value);
    };
    handleRank = e => {
        this.props.editRank(e.target.value);
    };
    handleGender = e => {
        this.props.editSex(e.target.value);
    };
    handleDate = e => {
        this.props.editDate(e.target.value);
    };
    handlePhone = e => {
        this.props.editPhone(e.target.value);
    };
    handleEmail = e => {
        this.props.editEmail(e.target.value);
    };
    handleSuperior = e => {
        this.props.editSuperiorID(e.target.value);
    };
    handleCancel = () => {
        this.props.history.push("/");
    };
    handleSave = () => {
        let newSoldier = {
            avatar: this.props.avatar,
            name: this.props.name,
            rank: this.props.rank,
            sex: this.props.sex,
            startDate: this.props.startDate,
            phone: this.props.phone,
            email: this.props.email,
            superiorID: this.props.superiorID
        };
        let id = this.props.match.params.id;
        const { page, sort, search, type, superior } = this.props;
        this.props.editSoldier(
            id,
            newSoldier,
            page,
            sort.asc,
            sort.sortby,
            search,
            type,
            superior
        );
    };
    render() {
        var avatar = avatar3;
        switch (this.props.avatar) {
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
        const { name, rank, sex, startDate, phone, email } = this.props;
        const valid = name && rank && sex && startDate && phone && email;
        return (
            <div style={{ display: "flex" }}>
                <div>{this.props.error ? this.props.error : null}</div>
                {this.props.finished ? (
                    <Redirect to={{ pathname: "/" }} />
                ) : null}
                {this.props.isFetching ? (
                    <div>loading...</div>
                ) : (
                    <div style={{ margin: "auto" }}>
                        <div>
                            <h3>Update Soldier</h3>
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
                                    onChange={this.handleAvatar}
                                    id="image-upload"
                                    accept="image/*"
                                    multiple
                                />
                                <label htmlFor="image-upload">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component="span"
                                    >
                                        Upload Avatar
                                    </Button>
                                </label>
                            </div>
                            <div>
                                <div>
                                    <TextField
                                        required
                                        label="Name"
                                        onChange={this.handleName}
                                        value={this.props.name}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        required
                                        select
                                        label="Rank"
                                        value={this.props.rank}
                                        onChange={this.handleRank}
                                        helperText="Please Select Rank"
                                    >
                                        <MenutItem value="General">
                                            General
                                        </MenutItem>
                                        <MenutItem value="Colonel">
                                            Colonel
                                        </MenutItem>
                                        <MenutItem value="Major">
                                            Major
                                        </MenutItem>
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
                                            value={this.props.sex}
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
                                        value={this.props.startDate}
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
                                        value={this.props.phone}
                                        onChange={this.handlePhone}
                                    >
                                        Office Phone
                                    </TextField>
                                </div>
                                <div>
                                    <TextField
                                        required
                                        label="Email"
                                        value={this.props.email}
                                        onChange={this.handleEmail}
                                    >
                                        Email
                                    </TextField>
                                </div>
                                <div>
                                    <TextField
                                        select
                                        label="Superior"
                                        value={this.props.superiorID}
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
                )}
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
    avatar: state.soldier.avatar,
    name: state.soldier.name,
    rank: state.soldier.rank,
    sex: state.soldier.sex,
    startDate: state.soldier.startDate,
    phone: state.soldier.phone,
    email: state.soldier.email,
    superiorID: state.soldier.superiorID,
    superiorName: state.soldier.superiorName,
    finished: state.soldier.editFinished,
    isFetching: state.soldier.editIsFetching,
    options: state.soldier.options,
    error: state.soldier.editError
});

const mapDispatchToProps = dispatch => ({
    editAvatar: avatar => dispatch(editAvatar(avatar)),
    editName: name => dispatch(editName(name)),
    editRank: rank => dispatch(editRank(rank)),
    editSex: sex => dispatch(editSex(sex)),
    editPhone: phone => dispatch(editPhone(phone)),
    editDate: date => dispatch(editDate(date)),
    editEmail: mail => dispatch(editEmail(mail)),
    editSuperiorID: id => dispatch(editSuperiorID(id)),
    editSuperiorName: name => dispatch(editSuperiorName(name)),
    editSoldier: (id, soldier, page, sort, sortby, search, type, superiorID) =>
        dispatch(
            editSoldier(
                id,
                soldier,
                page,
                sort,
                sortby,
                search,
                type,
                superiorID
            )
        )
});

export default connect(mapStateToProps, mapDispatchToProps)(SoldierEdit);
