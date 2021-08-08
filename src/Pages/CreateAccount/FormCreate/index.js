import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import CircularLoad from '../../../Components/Load';
import { validCpf, validBankAccount, validBankAccountHolder, validBankAgency, validBankDigit, validBankNumber } from './validate';
import dataJSON from './json/data.json';
import clsx from 'clsx';
import { MaskCPF, MaskBankAccount, MaskBankAgency, MaskBankNumber, MaskDigit } from './mask';
import './css/FormCreate.css'

const theme = createTheme({
    palette: {
        secondary: {
            light: '#303030',
            main: '#303030',
            contrastText: '#ffff',
        },
    }
});

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            marginBottom: '1rem',
            width: '100%',
        },
        paddingRight: '4rem',
        paddingTop: '3rem',
        paddingBottom: '3rem',
        paddingLeft: '1rem',
        height: '86vh',
        overflow: "auto",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));


export default function FormCreate() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [typeAlert, setTypeAlert] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [load, setLoad] = React.useState(false);
    const [disable, setDisable] = React.useState(true);

    const [data, setData] = useState({
        cpf: '',
        bankAccountHolder: '',
        bankNumber: '',
        bankAgency: '',
        bankName: '',
        bankAccount: '',
        bankAccountDigit: '',
    })

    const [validate, setValidate] = useState({
        cpf: false,
        bankAccountHolder: false,
        bankNumber: false,
        bankAgency: false,
        bankAccount: false,
        bankAccountDigit: false,
    })

    // Recebe valores do Input
    const handleChange = (event) => {
        const nameInput = event.target.name;
        setData({
            ...data,
            [nameInput]: event.target.value,
        });
    };

    // Altera valores dos inputs toda vez que ocorre alteração no campo número do banco e nome do banco
    useEffect(() => {
        var number = parseInt(data.bankNumber);
        if (dataJSON.map(x => x.code).indexOf(number) !== -1) {
            dataJSON.map(function (item) {
                if (number === item.code) {
                    setData({
                        ...data,
                        bankName: item.name,
                    });
                }
            })
        } else {
            setData({
                ...data,
                bankName: data.bankNumber ? 'Valor inválido' : '',
            });
        }
    }, [data.bankNumber, data.bankName]);

    // Altera valores dos inputs toda vez que ocorre alteração no objeto de dados e validação
    useEffect(() => {
        if (!validate.bankAccountDigit && data.bankAccountDigit &&
            !validate.bankAccountHolder && data.bankAccountHolder &&
            !validate.bankAgency && data.bankAgency &&
            !validate.bankNumber && data.bankNumber &&
            !validate.cpf && data.cpf &&
            !validate.bankAccount && data.bankAccount) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [data, validate]);


    // Envia informações do formulário, setTimeout utilizado para simular tempo de resposta da API
    function submitForm(event) {
        event.preventDefault();
        setLoad(true)
        setDisable(true)
        setTimeout(() => {
            console.log('Informações preenchidas no formulário: ', data)
            setOpen(true);
            setLoad(false)
            setMessage('Cadastro realizado com sucesso!')
            setTypeAlert('success')
        }, 1200);
    }

    // Fecha o alert e limpa os objetos
    function closeAlert() {
        setOpen(false)
        setData({
            ...data,
            cpf: '',
            bankAccountHolder: '',
            bankNumber: '',
            bankAgency: '',
            bankName: '',
            bankAccount: '',
            bankAccountDigit: '',
        })

        setValidate({
            ...validate,
            cpf: false,
            bankAccountHolder: false,
            bankNumber: false,
            bankAgency: false,
            bankAccount: false,
            bankAccountDigit: false,
        })
    }

    return (
        <div>
            <ThemeProvider theme={theme}>
                <form onSubmit={(event) => submitForm(event)} className={clsx(classes.root, "mobile-padding")} noValidate autoComplete="off">
                    {message ?
                        <div className="alert-message">
                            <Collapse in={open}>
                                <Alert
                                    variant="filled"
                                    severity={typeAlert}
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={closeAlert}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                >
                                    {message}
                                </Alert>
                            </Collapse>
                        </div>
                        : ''}
                    <TextField
                        error={validate.cpf}
                        id="cpf"
                        label="CPF"
                        placeholder="xxx.xxx.xxx-xx"
                        helperText={validate.cpf ? "*Documento inválido" : ""}
                        variant="outlined"
                        name="cpf"
                        value={data.cpf}
                        onChange={handleChange}
                        onKeyUp={() =>
                            setValidate({
                                ...validate,
                                cpf: !validCpf(data.cpf),
                            })
                        }
                        type="text"
                        color="secondary"
                        InputProps={{
                            inputComponent: MaskCPF,
                        }}
                    />
                    <TextField
                        error={validate.bankAccountHolder}
                        id="bankAccountHolder"
                        label="Nome da conta"
                        placeholder="João da Silva"
                        helperText={validate.bankAccountHolder ? "*Nome da conta é obrigatório" : ""}
                        variant="outlined"
                        name="bankAccountHolder"
                        value={data.bankAccountHolder}
                        onChange={handleChange}
                        type="text"
                        color="secondary"
                        onKeyUp={() =>
                            setValidate({
                                ...validate,
                                bankAccountHolder: validBankAccountHolder(data.bankAccountHolder),
                            })
                        }
                    />
                    <TextField
                        error={validate.bankNumber}
                        id="bankNumber"
                        label="Número do banco"
                        placeholder="000"
                        helperText={validate.bankNumber ? "*Número do banco não encontrado" : ""}
                        variant="outlined"
                        name="bankNumber"
                        value={data.bankNumber}
                        onChange={handleChange}
                        type="tel"
                        color="secondary"
                        onKeyUp={() =>
                            setValidate({
                                ...validate,
                                bankNumber: validBankNumber(data.bankNumber),
                            })
                        }
                        InputProps={{
                            inputComponent: MaskBankNumber,
                        }}
                    />
                    <TextField
                        id="bankName"
                        label="Banco"
                        disabled={true}
                        variant="outlined"
                        name="bankName"
                        type="text"
                        value={data.bankName}
                        color="secondary"
                    />
                    <TextField
                        error={validate.bankAgency}
                        id="bankAgency"
                        label="Agência"
                        placeholder="000000"
                        helperText={validate.bankAgency ? "*O número da agência é inválido" : ""}
                        variant="outlined"
                        name="bankAgency"
                        value={data.bankAgency}
                        onChange={handleChange}
                        type="tel"
                        color="secondary"
                        onKeyUp={() =>
                            setValidate({
                                ...validate,
                                bankAgency: validBankAgency(data.bankAgency),
                            })
                        }
                        InputProps={{
                            inputComponent: MaskBankAgency,
                        }}
                    />
                    <div className="form-div-duo-create-account">
                        <TextField
                            className="bankAccount"
                            error={validate.bankAccount}
                            id="bankAccount"
                            label="Conta"
                            placeholder="000000000"
                            helperText={validate.bankAccount ? "*O número da conta é inválido" : ""}
                            variant="outlined"
                            name="bankAccount"
                            value={data.bankAccount}
                            onChange={handleChange}
                            onKeyUp={() =>
                                setValidate({
                                    ...validate,
                                    bankAccount: validBankAccount(data.bankAccount),
                                })
                            }
                            InputProps={{
                                inputComponent: MaskBankAccount,
                            }}
                            type="tel"
                            color="secondary"
                        />
                        <span className="span-digito">-</span>
                        <TextField
                            className="bankAccountDigit"
                            error={validate.bankAccountDigit}
                            id="bankAccountDigit"
                            label="Dígito"
                            placeholder="0"
                            helperText={validate.bankAccountDigit ? "*Dígito inválido" : ""}
                            variant="outlined"
                            name="bankAccountDigit"
                            value={data.bankAccountDigit}
                            onChange={handleChange}
                            type="tel"
                            color="secondary"
                            onKeyUp={() =>
                                setValidate({
                                    ...validate,
                                    bankAccountDigit: validBankDigit(data.bankAccountDigit),
                                })
                            }
                            InputProps={{
                                inputComponent: MaskDigit,
                            }}
                        />
                    </div>
                    <div className="div-btn-create-account">
                        <Button type="submit" disabled={disable} variant="contained">
                            {load ? <CircularLoad /> : "Criar conta"}
                        </Button>
                    </div>
                </form>
            </ThemeProvider>
        </div>
    );
}