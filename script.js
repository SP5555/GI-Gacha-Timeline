var t1 = new Date().getTime();

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function tableHeaderBuilder(data) {
	let version_tr5 = document.getElementById("versionRow5");
	let version_tr4 = document.getElementById("versionRow4");

	for (var s = 5; s >= 4; s--) {
		for (var i = 0; i < data.length; i++) {
			let idvData = data[i];

			let version_r_td = document.createElement("td");
			version_r_td.colSpan = idvData["banner"].length;
			version_r_td.innerHTML = idvData["version"];
			if (s == 5) {
				version_tr5.appendChild(version_r_td);
			} else {
				version_tr4.appendChild(version_r_td);
			}
		}
	}
	let main5 = document.getElementById("mainTable5");
	let main4 = document.getElementById("mainTable4");
	let main_tbody5 = document.createElement("tbody"); main_tbody5.id = "tbody5";
	let main_tbody4 = document.createElement("tbody"); main_tbody4.id = "tbody4";

	main5.appendChild(main_tbody5); // main5 tbody append
	main4.appendChild(main_tbody4); // main4 tbody append
}

function mainLoader(data, method) {

	function insertFirst(p, c) {
		p.insertBefore(c, p.firstChild);
	}

	function insertLast(p, c) {
		p.appendChild(c);
	}

	function buildRow(tbody, character, is_first) {
		let cha_tr = document.createElement("tr");
		let cha_head_td = document.createElement("td");
		cha_head_td.className = "first-col";

		let img = document.createElement("img");
		img.className = "char-face";
		img.src = `GIfaces/${character.replace(/\s/g, "")}.png`;

		let name_div = document.createElement("div");
		name_div.className = "char-name";
		name_div.innerHTML = character;

		let fn_contianer = document.createElement("div");
		fn_contianer.className = "face-name-container";

		fn_contianer.appendChild(img);
		fn_contianer.appendChild(name_div);
		cha_head_td.appendChild(fn_contianer);
		cha_tr.appendChild(cha_head_td);

		for (var v = 0; v < data.length; v++) {
			for (var v1 = 0; v1 < data[v]["banner"].length; v1++) {
				let cha_r_td = document.createElement("td");
				cha_r_td.className = "tds";
				cha_r_td.id = `${character}_v${data[v]["version"]}_b${v1}`;
				let span_text = document.createElement("span")
				span_text.innerHTML = `${data[v]["version"]}`
				cha_r_td.appendChild(span_text);
				cha_tr.appendChild(cha_r_td);
			}
		}
		if (is_first) {
			insertFirst(tbody, cha_tr);
		} else {
			insertLast(tbody, cha_tr);
		}
	}

	function sortByTimeline(data) {
		let cha_list = [];
		for (var s = 5; s >= 4; s--) {
			for (var i = 0; i < data.length; i++) {
				let idvData = data[i];
				for (var i1 = 0; i1 < idvData["banner"].length; i1++) {
					for (var i2 = 0; i2 < idvData["banner"][i1][s].length; i2++) {
						let character = idvData["banner"][i1][s][i2];

						if (!cha_list.includes(character)) {
							cha_list.push(character);

							if (s == 5) {
								buildRow(main_tbody5, character, true);
							} else {
								buildRow(main_tbody4, character, true);
							}
						}
					}
				}
			}
		}
	}

	function sortByRecent(data) {
		let cha_list = [];
		for (var s = 5; s >= 4; s--) {
			for (var i = data.length - 1; i >= 0; i--) {
				let idvData = data[i];
				for (var i1 = idvData["banner"].length - 1; i1 >= 0; i1--) {
					for (var i2 = 0; i2 < idvData["banner"][i1][s].length; i2++) {
						let character = idvData["banner"][i1][s][i2];

						if (!cha_list.includes(character)) {
							cha_list.push(character);

							if (s == 5) {
								buildRow(main_tbody5, character, false);
							} else {
								buildRow(main_tbody4, character, false);
							}
						}
					}
				}
			}
		}
	}

	let main_tbody5 = document.getElementById("tbody5");
	while (main_tbody5.firstChild) {
		main_tbody5.removeChild(main_tbody5.lastChild);
	}
	let main_tbody4 = document.getElementById("tbody4");
	while (main_tbody4.firstChild) {
		main_tbody4.removeChild(main_tbody4.lastChild);
	}

	if (method == "timeline") {sortByTimeline(data)}
	if (method == "recent") {sortByRecent(data);}

	let space5 = document.createElement("div"); space5.className = "vertical-space";
	let space4 = document.createElement("div"); space4.className = "vertical-space";
	main_tbody5.appendChild(space5);
	main_tbody4.appendChild(space4);
}

function visualizer(data) {
	let charDict = {};

	for (var i = 0; i < data.length; i++) {
		var idvData = data[i];

		for (var i1 = 0; i1 < idvData["banner"].length; i1++) {
			// 5 star colorize
			for (var i2 = 0; i2 < idvData["banner"][i1]["5"].length; i2++) {
				let character = idvData["banner"][i1]["5"][i2];

				if (charDict[character] == undefined) {
					charDict[character] = 1;
				} else {
					charDict[character]++;
				}

				let tdbox = document.getElementById(`${character}_v${idvData["version"]}_b${i1}`)
				for (var x = 12; x > 0; x --) {
					try {
						R = 10*x;
						G = 26 + (x*10);
						B = 56 + (x*15);
						tdbox.style.backgroundColor = `rgb(${R},${G},${B})`;

						if (x == 12) {
							let banner_note = document.createElement("div");
							banner_note.className = "banner-note";
							let char_txt = document.createElement("span"); char_txt.className="no-wrap";
							char_txt.innerHTML = character;
							let v_txt = document.createElement("span"); v_txt.className="no-wrap";
							if (charDict[character] == 1) {
								v_txt.innerHTML = `1st Banner`;
							} else {
								v_txt.innerHTML = `Rerun ${charDict[character] - 1}`;
							}
							banner_note.appendChild(char_txt);
							banner_note.innerHTML += '\n';
							banner_note.appendChild(v_txt);
							tdbox.appendChild(banner_note);
						}
						
						tdbox = tdbox.nextSibling;
					}
					catch(e) {}
				}
			}
			// 4 star colorize
			for (var i2 = 0; i2 < idvData["banner"][i1]["4"].length; i2++) {
				let character = idvData["banner"][i1]["4"][i2];
				let tdbox = document.getElementById(`${character}_v${idvData["version"]}_b${i1}`)
				for (var x = 12; x > 0; x-=3) {
					try {
						R = 10*x;
						G = 26 + (x*10);
						B = 56 + (x*15);
						tdbox.style.backgroundColor = `rgb(${R},${G},${B})`;
						tdbox = tdbox.nextSibling;
					}
					catch(e) {}
				}
			}
		}
	}
}

function sortByT() {
	mainLoader(data, "timeline");
	visualizer(data);
}
function sortByMR() {
	mainLoader(data, "recent");
	visualizer(data);
}

tableHeaderBuilder(data);
sortByMR();

var t2 = new Date().getTime();
document.getElementById("loadTime").innerHTML = `Loading Time - ${t2 - t1}ms`