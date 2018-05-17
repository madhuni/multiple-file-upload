const formData = new FormData();

function uploadForm(e) {
  e.preventDefault();

  console.log($);
  $.ajax({
    url: '/api/',
    type: 'POST',
    data: formData,
    dataType: 'json',
    success: function(res) {
      console.log(res.data);
      onClearFormData();
      document.querySelector('.blog-form').reset();
    },
    error: function(err) {
      console.log(err);
    }
  });
}

function onClearFormData() {
  formData.delete('title');
  formData.delete('thumbnail');
  formData.delete('images');
  formData.delete('content');
}

function onInputChange(e) {
  e.stopPropagation();

  switch (e.target.type) {
    case 'text':
      // console.log(e.target.value);
      formData.append('title', e.target.value);
      break;

    case 'file':
      if (e.target.id === 'thumbnail') {
        // console.log(e.target.files[0]);
        formData.append('thumbnail', e.target.files[0]);
      } else if (e.target.id === 'images') {
        let filesList = [];
        const data = e.target.files;

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const element = data[key];
            filesList.push(element);
          }
        }
        // console.log(filesList);
        formData.append('images', filesList);
      }
      break;
  
    case 'textarea':
      // console.log(e.target.value);
      formData.append('content', e.target.value);
      break;
    
    default:
      break;
  }
}