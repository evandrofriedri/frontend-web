<template>
  <label :for="id" class="text-base text-gray-800 max-w">{{ label }}
    <button id="dropdown-button" type="button" title="Exportar dados" @click="toggleDropdown()" class="flex justify-between items-center w-full py-1.5 px-2 leading-none text-white bg-gray-700 hover:bg-gray-800 active:bg-gray-900 font-semibold rounded">
      <div></div>
      <font-awesome-icon icon="fa-solid fa-print" size="lg" />
      <font-awesome-icon icon="fa-solid fa-chevron-down" size="sm" />
    </button>
  </label>
  <div id="dropdown-menu" class="hidden absolute text-gray-800 top-50 w-400 border border-gray-300 bg-white shadow-md mt-2">
    <button class="flex items-center p-2 hover:bg-gray-200 duration-300" @click="createCsvFile();toggleDropdown()">
      <font-awesome-icon class="mr-2" icon="fa-solid fa-print" size="lg" /> Exportar em CSV
    </button>
    <button class="flex items-center p-2 hover:bg-gray-200 duration-300" @click="createPdfFile();toggleDropdown()">
      <font-awesome-icon class="mr-2" icon="fa-solid fa-print" size="lg" /> Exportar em PDF
    </button>
</div>
</template>
<script setup>
import html2pdf from 'html2pdf.js';
const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  data: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
  filename: {
    type: String,
    default: '',
  },
});

function toggleDropdown() {
  const dropdown = document.querySelector('#dropdown-menu');
  dropdown.classList.toggle('hidden');
}

function validate_characters(str) {
  if (str) {
    return JSON.stringify(str).replace(/[\r\n]+/gm, " ").replace(/,/g, ';');
  }
  return str;
}

function createCsvFile() {
  const printableList = JSON.parse(JSON.stringify(props.data));
  const csvContent = convertToCsv(printableList);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${props.filename}.csv`);
  link.click();
}

function convertToCsv(data){
  const headers = Object.keys(data[0]);
  const rows = data.map(obj => headers.map(header => validate_characters(obj[header])));
  const headerRow = headers.join(',');
  const csvRows = [headerRow, ...rows.map(row => row.join(','))];
  return csvRows.join('\n');
}

function createPdfFile(){
  var element = document.getElementById('print-document');
  let opt = {
    margin:       1,
    filename:     props.filename,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}
</script>
