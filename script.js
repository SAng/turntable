function execute() {
  var lines = document.getElementById("text").value.split('\n');
  var newlines = `			<Table
				rows="{ model: 'Dashboard', path:'contactNameData', templateShareable: false }"
				title="Repo Info"
				visibleRowCount="7">
				<columns>
					<Column
						id="name"
						width="11rem"
						sortProperty="repoId">
						<m:Label text="Repo Id" />
						<template>
							<m:Text text="{Dashboard>repoId}" wrapping="false" />
						</template>
					</Column>
				</columns>
			</Table>`;
//   console.log(lines.length)
//   for (var i = 0; i < lines.length; i++) {
//     if (lines[i].trim().length) {
//       newlines+=("\"" +lines[i].trim()+"\"")
//         if ((i+1) !== lines.length) {
//           newlines+=", ";
//         }
//     }
//   }
  document.getElementById("text3").value = newlines
}
  


function copy() {
  var copyTextarea = document.querySelector('#text3');
  copyTextarea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }
};
