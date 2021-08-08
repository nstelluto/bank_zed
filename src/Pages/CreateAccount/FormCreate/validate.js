import dataJSON from './json/data.json';


// Função que valida se o CPF é verdadeiro
export function validCpf(value) {
    var cpf = value

    var v1 = 0;
    var v2 = 0;
    var aux = false;

    for (var i = 1; cpf.length > i; i++) {
        if (cpf[i - 1] != cpf[i]) {
            aux = true;
        }
    }

    if (aux == false) {
        return false;
    }

    for (var i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
        v1 += cpf[i] * p;
    }

    v1 = ((v1 * 10) % 11);

    if (v1 == 10) {
        v1 = 0;
    }

    if (v1 != cpf[9]) {
        return false;
    }

    for (var i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
        v2 += cpf[i] * p;
    }

    v2 = ((v2 * 10) % 11);

    if (v2 == 10) {
        v2 = 0;
    }
    if (v2 == cpf[10]) {
        return true;
    } else {
        return false;
    }
}


// Função que valida se o nome da conta possui mais de 3 caracteres
export function validBankAccountHolder(value) {
    if (value.length >= 3) {
        return false
    } else {
        return true
    }
}

// Função que valida se o número do banco é maior ou igual a 1 e menor ou igual a 757
export function validBankNumber(value) {
    if (value >= 1 && value <= 757) {
        var number = parseInt(value);
        if (dataJSON.map(x => x.code).indexOf(number) !== -1) {

            dataJSON.map(function (item) {
                if (number == item.code) {
                    return false;
                }
            })
        } else {
            return true
        }
    } else {
        return true
    }
}

// Função que valida se o número da agência é maior ou igual a 1 e menor ou igual a 999999
export function validBankAgency(value) {
    if (value >= 1 && value <= 999999) {
        return false
    } else {
        return true
    }
}

// Função que valida se o número da conta é maior ou igual a 3 e menor ou igual a 999999999
export function validBankAccount(value) {
    var valor = parseFloat(value)
    if (valor >= 3 && valor <= 999999999) {
        return false

    } else {
        return true
    }
}

// Função que valida se o dígito é maior ou igual a 0 e menor ou igual a 9
export function validBankDigit(value) {
    if (value >= 0 && value <= 9) {
        return false
    } else {
        return true
    }
}