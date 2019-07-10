import * as React from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';

import 'easymde/dist/easymde.min.css';
import SimpleMDE from 'react-simplemde-editor';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DatePicker,
} from '@material-ui/pickers';
import Button from "components/CustomButtons/Button.jsx";


export interface IProjectEditViewProps {
    classes: ClassNameMap<string>;
    title: string;
    price: number;
    dueDate: Date;
    description: string;
    handleDone?: (save: boolean) => void;
    handleTitleChange: (value: string) => void;
    handlePriceChange: (value: number) => void;
    handleDateChange: (date: Date) => void;
    handleDescChange: (value: string) => void;
}

const style = theme => createStyles({
    root: {
        width: '100%',
        padding: theme.spacing(1),
        border: '1px solid #EEE',
        margin: theme.spacing(1)
    },
    container: {
        display: 'flex',
        justifyContent: 'left'
    },
    textFieldHalf: {
        width: '120px',
        paddingRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            width: '150px',
        },
        [theme.breakpoints.up('md')]: {
            width: '200px',
        }
    },
    doneContainer: {
        display: 'block',
        textAlign: 'right',
    },
    doneBtn: {
        border: '1px solid #4a148c',
        borderRadius: 0,
        color: theme.palette.primary.light,
        backgroundColor: '#FFF',
        padding: theme.spacing(1),
        marginLeft: theme.spacing(2),
        width: '160px',
        fontSize: '14px',
        bottom: 0,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
        '&:disabled': {
            backgroundColor: '#CCC',
        },
    },
});

const ProjectEditView: React.SFC<IProjectEditViewProps> = (props) => {

    const {
        classes,
        title,
        price,
        dueDate,
        description,
        handleDone,
        handleTitleChange,
        handlePriceChange,
        handleDateChange,
        handleDescChange
    } = props;
    return (
        <Card className={classes.root}>
            <TextField
                label="Title"
                margin="normal"
                fullWidth={true}
                value={title}
                onChange={e => handleTitleChange(e.target.value)}
            />
            <div className={classes.container}>
                <TextField
                    className={classes.textFieldHalf}
                    label="Price"
                    margin="normal"
                    type='number'
                    value={price}
                    onChange={e => handlePriceChange(parseInt(e.target.value))}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        className={classes.textFieldHalf}
                        margin="normal"
                        id="mui-pickers-date"
                        label="Due Date"
                        value={dueDate}
                        onChange={handleDateChange}
                    />
                </MuiPickersUtilsProvider>
            </div>
            <SimpleMDE
                value={description}
                onChange={handleDescChange}
                options={{
                    placeholder: 'Description here',
                    lineWrapping: false
                }}
            />
            {handleDone && (
                <div className={classes.doneContainer}>
                    <Button
                        color="primary"
                        className={classes.doneBtn}
                        onClick={() => handleDone(true)}
                    >
                        Done
                    </Button>
                    <Button
                        color="primary"
                        className={classes.doneBtn}
                        onClick={() => handleDone(false)}
                    >
                        Cancel
                    </Button>
                </div>
            )}
        </Card>
    );
}

export default withStyles(style)(ProjectEditView);