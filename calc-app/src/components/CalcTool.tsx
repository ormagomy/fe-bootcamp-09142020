import React, { ChangeEvent, useState } from 'react';
import { TextField, Button, makeStyles, IconButton, List, ListItem, Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { CalcToolHistory, CalcToolResults } from '../models/calcTools';
import { ADD_ACTION, SUBTRACT_ACTION, MULTIPLY_ACTION, DIVIDE_ACTION } from '../actions/calcToolActions';

const mapOpActionToString = (actionType: string) => {
    switch (actionType) {
        case ADD_ACTION:
            return '+';
        case SUBTRACT_ACTION:
            return '-';
        case MULTIPLY_ACTION:
            return '*';
        case DIVIDE_ACTION:
            return '/';
    }
};

const useStyles = makeStyles({
    resultContainer: {
        width: 240,
        fontSize: 40,
        textAlign: 'right',
        margin: '0 0 10px 4px',
    },
    inputContainer: {
        margin: '16px 4px',
    },
    buttonContainer: {
        margin: '16px 0',
    },
    actionButton: {
        minWidth: 40,
        margin: '0 4px',
    },
});

type CalcToolProps = {
    result: CalcToolResults;
    history: CalcToolHistory[];
    validationError?: string;
    onAdd: (num: number) => void;
    onSubtract: (num: number) => void;
    onMultiply: (num: number) => void;
    onDivide: (num: number) => void;
    onClear: () => void;
    onDeleteHistory: (num: number) => void;
    onValidationError: (message: string) => void;
};

export function CalcTool({ result, history, validationError, onAdd, onSubtract, onMultiply, onDivide, onClear, onDeleteHistory, onValidationError }: CalcToolProps) {
    const [numInput, setNumInput] = useState(0);
    const classes = useStyles();

    const clear = () => {
        setNumInput(0);
        onClear();
    };

    const doOperation = (op: (input: number) => void) => {
        return () => {
            if (numInput < 0 || numInput > 10) {
                onValidationError('Input must be between 0 and 10');
            } else {
                onValidationError('');
                op(numInput);
            }
        };
    };

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newInput = e.target.valueAsNumber;
        if (newInput < 0 || newInput > 10) {
            onValidationError('Input must be between 0 and 10');
        } else {
            onValidationError('');
        }
        setNumInput(newInput);
    };

    return (
        <>
            <div className={classes.resultContainer}>{result.total}</div>
            <div className={classes.inputContainer}>
                <TextField type="number" label="Num Input" value={numInput} onChange={inputChange} />
            </div>
            {validationError && <div>{validationError}</div>}
            <div className={classes.buttonContainer}>
                <Button className={classes.actionButton} variant="outlined" size="small" type="button" onClick={doOperation(onAdd)}>
                    +
                </Button>
                <Button className={classes.actionButton} variant="outlined" size="small" type="button" onClick={doOperation(onSubtract)}>
                    -
                </Button>
                <Button className={classes.actionButton} variant="outlined" size="small" type="button" onClick={doOperation(onMultiply)}>
                    *
                </Button>
                <Button className={classes.actionButton} variant="outlined" size="small" type="button" onClick={doOperation(onDivide)}>
                    /
                </Button>
                <Button className={classes.actionButton} variant="outlined" size="small" onClick={clear}>
                    Clear
                </Button>
            </div>
            <List dense>
                {history.map((item, index) => (
                    <ListItem key={index} divider={index !== history.length - 1}>
                        {mapOpActionToString(item.operation)} {item.value}
                        &nbsp;&nbsp;&nbsp;
                        <IconButton size="small" onClick={() => onDeleteHistory(index)}>
                            <Delete />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>ADD</TableCell>
                        <TableCell>SUBTRACT</TableCell>
                        <TableCell>MULTIPLY</TableCell>
                        <TableCell>DIVIDE</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{result.stats.add}</TableCell>
                        <TableCell>{result.stats.subtract}</TableCell>
                        <TableCell>{result.stats.multiply}</TableCell>
                        <TableCell>{result.stats.divide}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    );
}
