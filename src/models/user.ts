export class User {
    email: string;              //EMAIL DEL USUARIO
    password: string;           //CONTRASEÑA PARA INICIO DE SESIÓN
    confirm_password: string;   //CONFIRMACIÓN DE CONTRASEÑA PARA REGISTRO
    phone: number;              //TELÉFONO PRINCIPAL DEL USUARIO
    phoneNumber: string;
    run: string;                //ROL UNICO TRIBUTARIO DEL USUARIO (SIN NUMERO VERIFICADOR)
    v_run: number;              //DIGITO VERIFICADOR DEL RUN DEL USUARIO
    name: string;               //PRIMER NOMBRE DEL USUARIO
    surname: string;            //APELLIDO DEL USUARIO
    region: string;             //REGIÓN DE RESIDENCIA DEL USUARIO
    city: string;               //CIUDAD DE RESIDENCIA DEL USUARIO
    nickName: string;           //PSEUDÓNIMO POR EL CUAL QUIERE SER IDENTFICADO EL USUARIO
    uid: string;                //IDENTIFICADOR UNICO PARA ACCESO A BASE DE DATOS
    profilePhoto: string;       //FOTO DE PERFIL DEL USUARIO EN FORMATO base64
    dateBirth: string;          //FECHA DE NACIMIENTO DEL USUARIO EN FORMATO 31-12-2019
    age: number;                //EDAD DEL USUARIO
    weight: number;             //ALTURA DEL USUARIO EN METROS
    height: number;             //PESO DEL USUARIO EN KILOGRAMOS
    lastRateSolicitude: string; //ULTIMA FECHA DE ACTUALIZACIÓN DE DATOS DESDE GOOGLE FIT
    lastExerciceLoad: number;
    sex: string;

}