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

    function convertDataToHTML(recipeInfo) {
        return `
            <div class="recipe-container-detailed">
                <div class="recipe-container-header">
                    <h1 style=" margin: 10px;"> 
                    Dish Name : ${recipeInfo.title} <b style="color: black,font-size: 30px;"></b></h1>
                    <img src="${recipeInfo.image}" alt="${recipeInfo.title}">
                    <p>Source: ${recipeInfo.creditsText}</p>

                </div>
                
                <div class="recipe-container-body">
                    <div class="recipe-container-container">
                        <h2>Summary of the dish 🧑‍🍳: </h2>

                        <div class="summary-text" style="text-align: start;">
                            ${recipeInfo.summary}
                        </div>
                    </div>
                   
                    <div class="recipe-container-container">
                        <h2>Cuisine 🌍:</h2>
                        ${recipeInfo.cuisines && recipeInfo.cuisines.length > 0 ?
                            recipeInfo.cuisines.map(cuisine => `<p>- ${cuisine}</p>`).join('') :
                            ''}
                    </div>
                
                    <div class="recipe-container-container">
                        <h2>Utilized for :</h2>
                        ${recipeInfo.dishTypes.map(dishType => `<p>- ${dishType}</p>`).join('')}
                    </div>
                
                    <div class="recipe-container-container">
                        <h2>Dietary preferences 🍽:</h2>
                        ${recipeInfo.diets.map(diet => `<p>- ${diet}</p>`).join('')}
                    </div>

                    <div class="recipe-container-container">
                        <h2>Servings 🍴: ${recipeInfo.servings} people </h2>
                    </div>

                    <div class="recipe-container-container">
                        <h2>Cooking time ⌛️: ${recipeInfo.readyInMinutes} minture</h2>
                    </div>

                    <div class="recipe-container-container">
                        <h2>Recipe link  🔪: 
                            <a style="font-size: 22px;" href="${recipeInfo.spoonacularSourceUrl}" target="_blank">${recipeInfo.spoonacularSourceUrl}</a>
                        </h2>
                    </div>
                
                    <div class="recipe-container-container post-it">
                        <h2>Ingredients 📃</h2>
                        <ul>
                            ${recipeInfo.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="recipe-container-container stepper d-flex flex-column mt-5 ml-2">
                        <h2 style="margin-bottom: 16px">Instructions 😎:</h2>
                        ${recipeInfo.analyzedInstructions[0].steps.map((step, index) => `
                            <div class="d-flex mb-1">
                                <div class="d-flex flex-column pr-4 align-items-center">
                                    <div class="rounded-circle py-2 px-3 bg-primary text-white mb-1">${index}</div>
                                    <div class="line h-100"></div>
                                </div>
                                <div>
                                    <p class="lead text-muted pb-3">${step.step}</p>
                                </div>
                            </div>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;
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
                $('#dataDisplay').show();

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
                            console.log('Click:', item.id)
                            // $('#dataDisplay').hide();
                            $.ajax({
                                type: 'GET',
                                url: '/process_food/' + item.id, 
                                success: function (data) {
                                    console.log('data:', data.data)
                                    const recipeInfo = data.data
                                    // while (resultDisplay.firstChild) {
                                    //     resultDisplay.removeChild(resultDisplay.firstChild);
                                    // }
                                    // // Tạo phần tử mới từ createRecipeDetails(item) và thêm vào resultDisplay
                                    // var resultDetail = createRecipeDetails(recipeInfo);
                                    // resultDisplay.appendChild(resultDetail);
                                    $('#resultDisplay').empty();

                                    // Gọi hàm convertDataToHTML để chuyển đổi dữ liệu thành HTML
                                    var html = convertDataToHTML(recipeInfo);
                            
                                    // Chèn HTML vào #resultDisplay
                                    $('#resultDisplay').html(html);
                            
                                    // Hiển thị #resultDisplay nếu đã ẩn
                                    $('#resultDisplay').show();
                                },
                                error: function (xhr, status, error) {
                                console.error('Error:', error);
                            },
                                });

                        });
                    }
                }
                console.log('Success!');
                console.log("Data:", data.data)
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            },
        });
    });
});