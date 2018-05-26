$(init)

function init() {
	console.log("a")
	$("#upload").on("click", uploadFile)
	}


function uploadFile() {

var formData = new FormData();
formData.append('file', $('#file')[0].files[0]);   

	$.ajax({
		type:"POST",
		url:"http://localhost:4000/upload",
		data: formData,
		processData : false, 
		contentType : false,
		async:false,
		xhrFields: {
			withCredentials: false
		},
		// data
		crossDomain: true
	}).done(function(e){
		console.log(e);
		$("img").attr('src','http://localhost:4000/' + e.path)
	});
}


