/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { Collapse } from 'bootstrap'
/* Inject css */
require('./scss/app.scss')

// const { getAllDatas } = require('./scripts/utils/api')
require('./scripts/pages/index')
// const allRecipes = await getAllDatas()

const spanVersion = document.getElementById('version')
spanVersion.innerText = VERSION
