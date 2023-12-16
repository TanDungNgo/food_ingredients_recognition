



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

    // function createRecipeDetails(recipeInfo) {
    //     const nameElement = document.createElement('p');
    //     nameElement.textContent = `Tên món ăn: ${recipeInfo.title}`;

    //     const imageElement = document.createElement('img');
    //     imageElement.src = recipeInfo.image;
    //     imageElement.alt = recipeInfo.title;

    //     const sourceElement = document.createElement('p');
    //     sourceElement.textContent = `Nguồn: ${recipeInfo.creditsText}`;

    //     const summaryElement = document.createElement('p');
    //     summaryElement.textContent = `Tóm tắt món ăn: ${recipeInfo.summary}`;

    //     const cuisinesElement = document.createElement('div');
    //     cuisinesElement.classList.add('cuisines-container');
    //     if (recipeInfo.cuisines && recipeInfo.cuisines.length > 0) {
    //         const cuisinesTitle = document.createElement('p');
    //         cuisinesTitle.textContent = 'Ẩm thực:';
    //         cuisinesElement.appendChild(cuisinesTitle);
    //         recipeInfo.cuisines.forEach(cuisine => {
    //             const cuisineItem = document.createElement('p');
    //             cuisineItem.textContent = `- ${cuisine}`;
    //             cuisinesElement.appendChild(cuisineItem);
    //         });
    //     }

    //     const dishTypesElement = document.createElement('div');
    //     dishTypesElement.classList.add('dish-types-container');
    //     const dishTypesTitle = document.createElement('p');
    //     dishTypesTitle.textContent = 'Sử dụng làm:';
    //     dishTypesElement.appendChild(dishTypesTitle);
    //     recipeInfo.dishTypes.forEach(dishType => {
    //         const dishTypeItem = document.createElement('p');
    //         dishTypeItem.textContent = `- ${dishType}`;
    //         dishTypesElement.appendChild(dishTypeItem);
    //     });

    //     const dietsElement = document.createElement('div');
    //     dietsElement.classList.add('diets-container');
    //     const dietsTitle = document.createElement('p');
    //     dietsTitle.textContent = 'Chế độ ăn kiêng:';
    //     dietsElement.appendChild(dietsTitle);
    //     recipeInfo.diets.forEach(diet => {
    //         const dietItem = document.createElement('p');
    //         dietItem.textContent = `- ${diet}`;
    //         dietsElement.appendChild(dietItem);
    //     });

    //     const servingsElement = document.createElement('p');
    //     servingsElement.textContent = `Khẩu phần ăn: ${recipeInfo.servings} người`;

    //     const timeElement = document.createElement('p');
    //     timeElement.textContent = `Thời gian nấu: ${recipeInfo.readyInMinutes} phút`;

    //     const sourceUrlElement = document.createElement('p');
    //     sourceUrlElement.textContent = `Nguồn link hướng dẫn: ${recipeInfo.spoonacularSourceUrl}`;

    //     const ingredientsElement = document.createElement('div');
    //     ingredientsElement.classList.add('ingredients-container');
    //     const ingredientsTitle = document.createElement('p');
    //     ingredientsTitle.textContent = 'Nguyên liệu:';
    //     ingredientsElement.appendChild(ingredientsTitle);
    //     recipeInfo.extendedIngredients.forEach(ingredient => {
    //         const ingredientItem = document.createElement('p');
    //         ingredientItem.textContent = `- ${ingredient.original}`;
    //         ingredientsElement.appendChild(ingredientItem);

    //         if (ingredient.meta) {
    //             ingredient.meta.forEach(meta => {
    //                 const metaItem = document.createElement('p');
    //                 metaItem.textContent = `  +) ${meta}`;
    //                 ingredientsElement.appendChild(metaItem);
    //             });
    //         }
    //     });

    //     const instructionsElement = document.createElement('div');
    //     instructionsElement.classList.add('instructions-container');
    //     const instructionsTitle = document.createElement('p');
    //     instructionsTitle.textContent = 'Cách làm:';
    //     instructionsElement.appendChild(instructionsTitle);
    //     recipeInfo.analyzedInstructions[0].steps.forEach(step => {
    //         const stepItem = document.createElement('p');
    //         stepItem.textContent = `${step.number}. ${step.step}`;
    //         instructionsElement.appendChild(stepItem);
    //     });

    //     const container = document.createElement('div');
    //     container.classList.add('recipe-container-detailed');
    //     container.appendChild(nameElement);
    //     container.appendChild(imageElement);
    //     container.appendChild(sourceElement);
    //     container.appendChild(summaryElement);
    //     container.appendChild(cuisinesElement);
    //     container.appendChild(dishTypesElement);
    //     container.appendChild(dietsElement);
    //     container.appendChild(servingsElement);
    //     container.appendChild(timeElement);
    //     container.appendChild(sourceUrlElement);
    //     container.appendChild(ingredientsElement);
    //     container.appendChild(instructionsElement);

    //     return container;
    // }

    function convertDataToHTML(recipeInfo) {
        return `
            <div class="recipe-container-detailed">
                <h1><b style="color: black,font-size: 30px;">Tên món ăn: ${recipeInfo.title}</b></h1>
                <img src="${recipeInfo.image}" alt="${recipeInfo.title}">
                <p>Nguồn: ${recipeInfo.creditsText}</p>
                <p>Tóm tắt món ăn: ${recipeInfo.summary}</p>
            
                <div class="cuisines-container">
                    <p>Ẩm thực:</p>
                    ${recipeInfo.cuisines && recipeInfo.cuisines.length > 0 ?
                        recipeInfo.cuisines.map(cuisine => `<p>- ${cuisine}</p>`).join('') :
                        ''}
                </div>
            
                <div class="dish-types-container">
                    <p>Sử dụng làm:</p>
                    ${recipeInfo.dishTypes.map(dishType => `<p>- ${dishType}</p>`).join('')}
                </div>
            
                <div class="diets-container">
                    <p>Chế độ ăn kiêng:</p>
                    ${recipeInfo.diets.map(diet => `<p>- ${diet}</p>`).join('')}
                </div>
            
                <p>Khẩu phần ăn: ${recipeInfo.servings} người</p>
                <p>Thời gian nấu: ${recipeInfo.readyInMinutes} phút</p>
                <p>Nguồn link hướng dẫn: ${recipeInfo.spoonacularSourceUrl}</p>
            
                <div class="ingredients-container">
                    <p>Nguyên liệu:</p>
                    ${recipeInfo.extendedIngredients.map(ingredient => `<p>- ${ingredient.original}</p>` +
                    (ingredient.meta ? ingredient.meta.map(meta => `<p>  +) ${meta}</p>`).join('') : '')).join('')}
                </div>
            
                <div class="instructions-container">
                    <p>Cách làm:</p>
                    ${recipeInfo.analyzedInstructions[0].steps.map(step => `<p>${step.number}. ${step.step}</p>`).join('')}
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

                            // console.log('Clicked:', item);
                            console.log('Click:', item.id)
                            $('#dataDisplay').hide();
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