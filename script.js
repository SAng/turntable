function execute() {
  var newTable = `			<t:Table
				rows= rowPlaceholder
				class= "tewTable"
				noData= noDataPlaceholder
				visibleRowCount="20">
				<t:columns>
				columnPlaceholder
				</t:columns>
			</t:Table>`;

var newColumn = `					<t:Column
						attPlaceholder
						sortProperty="sortPropertyPlaceholder">
						textPropertyPlaceholder
						<t:template>
							templatePlaceholder
						</t:template>
					</t:Column>
`;
  	var noData = "No Data";
	var oldTable = document.getElementById("text").value;
	var items = oldTable.substring(
		    oldTable.indexOf("items=") + 6, 
		    oldTable.substring(oldTable.indexOf("items=")).indexOf(`" >`)+ 1 + oldTable.indexOf("items=")
		).trim();

	if (oldTable.indexOf("noDataText=") > 0) {
		noData = oldTable.substring(
		    oldTable.indexOf("noDataText=") + 11, 
		    oldTable.substring(oldTable.indexOf('noDataText="')+13).indexOf(`"`)+ oldTable.indexOf('noDataText="')+13
		).trim() + '"';
	}

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
	var cellArray = cells.split(`<`);
	cellArray.map(line => line.trim());

	var columns = "";
	var addAtt = '';
	var counter = 0;
	for (var i =1; i<headerArray.length; i++) {
		var addColumn = newColumn;

		var att = headerArray[i].split("/n")
		console.log("att")
		console.log(att)
		for (var j=0; j<att.length; j++) {
			var row = att[j];
			if (row.indexOf(`data:text="`) >= 0) {
			    	text = row.substring(
					    row.lastIndexOf(`data:text="`) + 11, 
					    row.indexOf(`"`)
					).trim();
			    } else if (row.indexOf(`data:field="`) >=0) {
				       	sort = row.substring(
					    row.lastIndexOf(`data:field="`) + 12, 
					    row.indexOf(`"`)
					).trim();
			    } else {
			    	addAtt+=row+'\n';
			    }
			
		}
		var sort = "";
		var text = "";
		
		if (!(sort)) {
			sort = "noLabel" + counter;
			counter++;
		}
		addColumn = addColumn.replace("sortPropertyPlaceholder", sort)
		if (text) {
			text = (`<m:Label text="textPropertyPlaceholder" />`).replace("textPropertyPlaceholder", text)
		}
		addColumn = addColumn.replace("textPropertyPlaceholder", text)
		addColumn = addColumn.replace("attPlaceholder", addAtt)
		addColumn = addColumn.replace("templatePlaceholder", `<` + cellArray[i])
		columns+=addColumn;
	}
		
	newTable = newTable.replace("noDataPlaceholder", noData)
	newTable = newTable.replace("columnPlaceholder", columns);
  
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
