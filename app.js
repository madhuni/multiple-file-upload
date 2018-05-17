const formData = new FormData();
let data = {};

function uploadForm(e) {
  e.preventDefault();

  console.log(data);

  $.ajax({
    url: 'http://192.168.1.106:8000/api/v1/posts/',
    type: 'POST',
    data: formData,
    dataType: 'formData',
    processData: false,
    contentType: false,
    success: function(data) {
      console.log('Request successful', data);
      onClearFormData();
    },
    error: function(xhr) {
      console.log('I am in error function', xhr);
      onClearFormData();
    }
  });
}

function onClearFormData() {
  // console.log('onClearFormData is called bitch');
  formData.delete('title');
  formData.delete('thumbnail');
  formData.delete('images');
  formData.delete('content');
  data = {};
  document.querySelector("#blog-form").reset();

  // console.log('current state is,', formData, data);
}

function onInputChange(e) {
  e.stopPropagation();

  switch (e.target.type) {
    case 'text':
      // console.log(e.target.value);
      formData.append('title', e.target.value);
      data['title'] = e.target.value;
      break;

    case 'file':
      if (e.target.id === 'thumbnail') {
        // console.log(e.target.files[0]);
        formData.append('thumbnail', e.target.files[0]);
        data['thumbnail'] = e.target.files[0];
      } else if (e.target.id === 'images') {
        let filesList = [];
        const files = e.target.files;

        for (const key in files) {
          if (files.hasOwnProperty(key)) {
            const element = files[key];
            filesList.push({image: element});
          }
        }
        // console.log(filesList);
        formData.append('images', filesList);
        data['images'] = filesList;
      }
      break;
  
    case 'textarea':
      // console.log(e.target.value);
      formData.append('content', e.target.value);
      data['content'] = e.target.value;
      break;
    
    default:
      break;
  }
}