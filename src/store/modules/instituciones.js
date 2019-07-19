const state = {
    instituciones: ['Universidad César Vallejo', 'Universidad Nacional', 'UCP', 'UNI', 'UPEU', 'Otros'],
    ciudadList: ['Tarapoto', 'Moyobamba', 'Juanjui', 'Bellavista', 'Chiclayo', 'Lima', 'Otros'],
    microRed: [
        {text: 'NO PERTENECE', code: '003001'},
        {text: 'CHAZUTA', code: '043001'},
        {text: 'SAUCE', code: '103001'},
        {text: 'PAPAPLAYA', code: '113001'},
        {text: 'BANDA DE SHILCAYO', code: '123001'},
        {text: 'TARAPOTO', code: '133001'},
        {text: 'MORALES', code: '143001'},
        {text: 'JUAN GUERRA', code: '153001'}
    ],
    profesionesList: ['Ingeniería de Sistemas', 'Ingeniería', 'Derecho', 'Economía', 'Ingeniería Civil', 'Agronomía', 'Otros'],
    profesion: ['MEDICO GENERAL', 'MEDICO NEUMOLOGO', 'MEDICO CARDIOLOGO', 'MEDICO NEUROLOGO', 'MEDICO GASTROENTEROLOGO', 'MEDICO DERMATOLOGO', 'MEDICO NEFROLOGO', 'MEDICO ONCOLOGO', 'MEDICO PSIQUIATRA', 'MEDICO CIRUJANO GENERAL', 'MEDICO TRAUMATOLOGO ORTOPEDISTA', 'MEDICO OTORRINOLARINGOLOGO', 'MEDICO OFTALMOLOGO', 'MEDICO UROLOGO', 'MEDICO CIRUJANO ONCOLOGO', 'MEDICO PATOLOGO', 'MEDICO OTROS CIRUGIA', 'MEDICO PEDIATRA', 'MEDICO GINECO-OBSTETRA', 'MEDICO EPIDEMIOLOGO', 'MEDICO RADIOLOGO', 'MEDICO OTRAS ESPECIALIDADES', 'OBSTETRIZ', 'NUTRICIONISTA', 'ODONTOLOGO', 'QUIMICO FARMACEUTICO', 'RADIOTERAPEUTA', 'PSICOLOGO', 'ENFERMERA (O)', 'TECNOLOGO MEDICO', 'BIOLOGO', 'VETERINARIO', 'ASISTENTA SOCIAL', 'TECNICOS DE SALUD', 'TECNICAS DE ENFERMERIA', 'TECNICO DE LABORATORIO', 'TECNICO RADIOLOGO', 'TECNICO DENTAL', 'TECNICO SANEAMIENTO AMBIENTAL', 'AUXILIARES DE SALUD', 'OTROS TECNICOS Y AUXILIARES', 'OTROS NO ESPECIFICADOS', 'INTERNO DE MEDICINA', 'INTERNOS NO MEDICOS', 'SERUMISTA MEDICO', 'SERUMISTA ENFERMERA', 'SERUMISTA ODONTOLOGO', 'SERUMISTA OBSTETRIZ', 'SERUMISTA SERVICIO SOCIAL', 'SERUMISTA PSICOLOGO', 'MEDICO RESIDENTE', 'AGENTE COMUNITARIO', 'ESTADISTICO'],
    establecimiento: [
        { descripcion: 'AGUANO MUYUNA', codDep: '22', codProv: '09', codDist: '04', code: '043001' },
        { descripcion: 'ASUNCION', codDep: '22', codProv: '09', codDist: '11', code: '113001' },
        { descripcion: 'ATUMPAMPA', codDep: '22', codProv: '09', codDist: '01', code: '133001' },
        { descripcion: 'BELLO HORIZONTE', codDep: '22', codProv: '09', codDist: '09', code: '123001' },
        { descripcion: 'CACATACHI', codDep: '22', codProv: '09', codDist: '09', code: '143001' },
        { descripcion: 'CALLANAYACU', codDep: '22', codProv: '09', codDist: '03', code: '043001' },
        { descripcion: 'CHAZUTA', codDep: '22', codProv: '09', codDist: '04', code: '043001' },
        { descripcion: 'CURIYACU', codDep: '22', codProv: '09', codDist: '01', code: '043001' },
        { descripcion: 'BANDA SHILCAYO', codDep: '22', codProv: '09', codDist: '09', code: '123001' },
        { descripcion: 'DOS DE MAYO', codDep: '22', codProv: '09', codDist: '13', code: '103001' },
        { descripcion: 'HOSPITAL RURAL DE PAPAPLAYA', codDep: '22', codProv: '09', codDist: '11', code: '113001' },
        { descripcion: 'HUAYCO TARAPOTO', codDep: '22', codProv: '09', codDist: '01', code: '133001' },
        { descripcion: 'HUIMBAYOC', codDep: '22', codProv: '09', codDist: '07', code: '053001' },
        { descripcion: 'JUAN GUERRA', codDep: '22', codProv: '09', codDist: '08', code: '153001' },
        { descripcion: 'LA UNION (SANIRARCA)', codDep: '22', codProv: '09', codDist: '09', code: '123001' },
        { descripcion: 'LAS PALMAS', codDep: '22', codProv: '09', codDist: '09', code: '123001' },
        { descripcion: 'LECHE', codDep: '22', codProv: '09', codDist: '07', code: '053001' },
        { descripcion: 'MACHUNGO', codDep: '22', codProv: '09', codDist: '02', code: '153001' },
        { descripcion: 'MIRAFLORES', codDep: '22', codProv: '09', codDist: '07', code: '053001' },
        { descripcion: 'MORALES', codDep: '22', codProv: '09', codDist: '10', code: '143001' },
        { descripcion: 'NAVARRO', codDep: '22', codProv: '09', codDist: '05', code: '053001' },
        { descripcion: 'NUEVE DE ABRIL', codDep: '22', codProv: '09', codDist: '01', code: '133001' },
        { descripcion: 'NUEVO SAN JUAN', codDep: '22', codProv: '09', codDist: '11', code: '113001' },
        { descripcion: 'PELEJO', codDep: '22', codProv: '09', codDist: '06', code: '113001' },
        { descripcion: 'PONGO ISLA', codDep: '22', codProv: '09', codDist: '07', code: '053001' },
        { descripcion: 'PROGRESO KM.30', codDep: '22', codProv: '09', codDist: '09', code: '123001' },
        { descripcion: 'PUCALLPA', codDep: '22', codProv: '09', codDist: '07', code: '053001' },
        { descripcion: 'PUERTO MERCEDES', codDep: '22', codProv: '09', codDist: '11', code: '113001' },
        { descripcion: 'PUNTA DEL ESTE', codDep: '22', codProv: '09', codDist: '01', code: '133001' },
        { descripcion: 'REFORMA', codDep: '22', codProv: '09', codDist: '11', code: '113001' },
        { descripcion: 'SAN ANTONIO  RIO HUALLAGA', codDep: '22', codProv: '09', codDist: '11', code: '113001' },
        { descripcion: 'SAN ANTONIO DE CUMBAZA', codDep: '22', codProv: '09', codDist: '12', code: '143001' },
        { descripcion: 'SAN JOSE 2 DE MAYO', codDep: '22', codProv: '09', codDist: '07', code: '053001' },
        { descripcion: 'SAN JOSE DE YANAYACU', codDep: '22', codProv: '09', codDist: '07', code: '053001' },
        { descripcion: 'SAN JOSE KM.34', codDep: '22', codProv: '09', codDist: '09', code: '123001' },
        { descripcion: 'SAN JUAN RIO HUALLAGA', codDep: '22', codProv: '09', codDist: '11', code: '113001' },
        { descripcion: 'SAN PEDRO DE CUMBAZA', codDep: '22', codProv: '09', codDist: '12', code: '143001' },
        { descripcion: 'SANTA MARTHA', codDep: '22', codProv: '09', codDist: '07', code: '053001' },
        { descripcion: 'SANTA ROSA DE CHIPAOTA', codDep: '22', codProv: '09', codDist: '04', code: '043001' },   
        { descripcion: 'SANTA ROSA DE CUMBAZA', codDep: '22', codProv: '09', codDist: '01', code: '133001' },
        { descripcion: 'SANTA ROSILLO CHIPURANA', codDep: '22', codProv: '09', codDist: '07', code: '053001' },
        { descripcion: 'SAUCE', codDep: '22', codProv: '09', codDist: '13', code: '103001' },
        { descripcion: 'SHAPAJA', codDep: '22', codProv: '09', codDist: '14', code: '153001' },
        { descripcion: 'SHILCAYO', codDep: '22', codProv: '09', codDist: '04', code: '043001' },
        { descripcion: 'TARAPOTO', codDep: '22', codProv: '09', codDist: '01', code: '133001' },
        { descripcion: 'TIPISHCA', codDep: '22', codProv: '09', codDist: '05', code: '053001' },
        { descripcion: 'TUNUNTUNUMBA', codDep: '22', codProv: '09', codDist: '02', code: '043001' },
        { descripcion: 'UTCURARCA', codDep: '22', codProv: '09', codDist: '01', code: '153001' },
        { descripcion: 'YACUCATINA', codDep: '22', codProv: '09', codDist: '08', code: '153001' },
        { descripcion: 'YARINA', codDep: '22', codProv: '09', codDist: '05', code: '053001' }        
    ],
    condicion: ['NOMBRADO', 'CONTRATADO', 'SERUM', 'RESIDENTE', 'INTERNO', 'ALUMNO', 'AGENTE COMUNITARIO', 'OTROS', 'DESTACADO']
}
const getters = {
    getInstituciones(state) {
        return state.instituciones
    },
    getCiudadList(state) {
        return state.ciudadList
    },
    getProfesionesList(state) {
        return state.profesion
    },
    getCondicion(state) {
        return state.condicion
    },
    getMicroRed(state) {
        return state.microRed
    },
    getEstablecimiento (state) {
        return state.establecimiento
    }
}
export default { state, getters }