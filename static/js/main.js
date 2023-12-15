



$(document).ready(function () {
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#response').show();
        $('#start').hide();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });

    function createRecipe(item) {
        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.title;
        const title = document.createElement('p');
        title.textContent = item.title;
        const container = document.createElement('div');
        container.classList.add('recipe-container');
        container.appendChild(image);
        container.appendChild(title);
        return container;
    }

    function createRecipeDetails(item) {
        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.title;
        const title = document.createElement('p');
        title.textContent = item.title;
        const container = document.createElement('div');
        container.classList.add('recipe-container-detaile');
        container.appendChild(image);
        container.appendChild(title);
        return container;
    }

    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);
        console.log(form_data);

        // Show loading animation
        $(this).hide();
        $('.loader').show();

        $.ajax({
            type: 'POST',
            url: '/predict', 
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text(' Result:  ' + data.result);


                var dataDisplay = document.getElementById('dataDisplay');
                dataDisplay.innerHTML = '';

                var resultDisplay = document.getElementById('resultDisplay');
                if (resultDisplay) {

                    var newElement = document.createElement('div');
                    resultDisplay.appendChild(newElement);
                    resultDisplay.innerHTML = ''; 
                    // Các thao tác khác trên resultDisplay
                } else {
                    console.error('Không tìm thấy phần tử resultDisplay.');
                }
                


                for (const key in data.data.results) {
                    if (data.data.results.hasOwnProperty(key)) {
                        const item = data.data.results[key];

                        const container = createRecipe(item);
                        dataDisplay.appendChild(container);

                        container.addEventListener('click', function () {

                            console.log('Clicked:', item);

                            $('#dataDisplay').hide();


                            
                            while (resultDisplay.firstChild) {
                                resultDisplay.removeChild(resultDisplay.firstChild);
                            }
                            // Tạo phần tử mới từ createRecipeDetails(item) và thêm vào resultDisplay
                            var resultDetail = createRecipeDetails(item);
                            resultDisplay.appendChild(resultDetail);
                        });
                    }
                }

                // var dataDisplay = document.getElementById('dataDisplay');
                // dataDisplay.innerHTML = ''; 
                //     for (const key in data.data.results) {
                //         if (data.data.results.hasOwnProperty(key)) {
                //             const item = data.data.results[key];


                //             const image = document.createElement('img');
                //             image.src = item.image;
                //             image.alt = item.title;
                    

                //             const title = document.createElement('p');
                //             title.textContent = item.title;
                //             const container = document.createElement('div');

                //             container.classList.add('recipe-container');

                //             container.appendChild(image);
                //             container.appendChild(title);
                    
                //             dataDisplay.appendChild(container);

                //             container.addEventListener('click', function () {
                //                 console.log('Clicked:', item);

                //                 var resultDisplay = document.getElementById('resultDisplay');
                //                 resultDisplay.innerHTML = ''; 
        

                //                 const image = document.createElement('img');
                //                 image.src = item.image;
                //                 image.alt = item.title;
                                    

                //                 const title = document.createElement('p');
                //                 title.textContent = item.title;
                //                 const container = document.createElement('div');

                //                 container.classList.add('recipe-container');
                //                 container.appendChild(image);
                //                 container.appendChild(title);
                                    
                //                 resultDisplay.appendChild(container);                           
                //             });
                //         }
                //     }

                console.log('Success!');
                console.log("Data:", data.data)
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            },
        });
    });

});