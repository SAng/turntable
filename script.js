function execute() {
  var lines = document.getElementById("text").value.split('\n');
  var newTable = `			<t:Table
				rows=rowPlaceholder
				class="tewTable"
				noData="No data"
				visibleRowCount="20">
				<t:columns>
				columnPlaceholder
				</t:columns>
			</t:Table>`;

var newColumn = `					<t:Column
						attPlaceholder
						sortProperty="sortPropertyPlaceholder">
						<m:Label text="textPropertyPlaceholder" />
						<t:template>
							templatePlaceholder
						</t:template>
					</t:Column>
`;
  
	var oldTable = document.getElementById("text3").value;
	var items = oldTable.substring(
		    oldTable.lastIndexOf("items=") + 6, 
		    oldTable.indexOf(">")
		).trim();
	newTable = newTable.replace("rowPlaceholder", items);
	var columnHeaders = oldTable.substring(
	    oldTable.lastIndexOf("<columns>") + 9, 
	    oldTable.indexOf("</columns>")
	).trim();
	var cells = oldTable.substring(
	    oldTable.lastIndexOf("<cells>") + 7, 
	    oldTable.indexOf("</cells>")
		).trim();
	var headerArray = columnHeaders.split(`<Column`);
	headerArray.map(line => line.trim());
	var cellArray = columnHeaders.split(`<`);
	cellArray.map(line => line.trim());
	
	var columns = "";
	for (var i =0; i<columnHeaders.length; i++) {
		var addColumn = newColumn;
		
		var att = headerArray.split("\n")
		for (var j=0; j<att.length; att++) {
			var row = att[j];
			if (row.indexOf(`data:text="`)) {
			    	text = row.substring(
					    row.lastIndexOf(`data:text="`) + 11, 
					    row.indexOf(`"`)
					).trim();
			    } else if (row.indexOf(`data:field="`)) {
				       	text = row.substring(
					    row.lastIndexOf(`data:field="`) + 12, 
					    row.indexOf(`"`)
					).trim();
			    } else {
			    	att+=row+'\n';
			    }
			
		}
		var sort = "";
		var text = "";
		

		addColumn.replace("sortPropertyPlaceholder", sort)
		addColumn.replace("textPlaceholder", text)
		addColumn.replace("attPlaceholder", att)
		addColumn.replace("templatePlaceholder", `<` + cells[i])
		columns+=addColumn;
	}
		
	
	newTable.replace("columnPlaceholder", columns);
  
  document.getElementById("text3").value = newTable
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
