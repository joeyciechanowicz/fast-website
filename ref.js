/*
    Fake reference generator helper for handlebars
 */

let refCount = 0;

module.exports = function (text) {
	if (text === undefined) {
		return new Array(refCount).fill(0).map((x, i) => `
		<li class="small-space-below border-gray-medium border-bottom-1 position-relative js-ref-item" itemprop="citation" itemscope="itemscope" itemtype="http://schema.org/Article" data-test="citation">
			<span class="indented-counter serif h2 tighten-line-height text-right position-absolute grade-c-hide">${i}.</span>
			<p class="tiny-space-below" id="ref-CR${i}">
				Fake, Mc Fakerson ${i}. <i>et al</i>.
				A fake ${i} article ${i} title ${i} with ${i} numbers ${i} in it ${i}. <i>Science</i> <b>11</b>, 1–${i} (20${i}).
			</p>
			<ul class="js-ref-links clean-list cleared strong sans-serif text13 hide-print small-space-below">
				<li class="pin-right">
					<ul class="clean-list ma0">
						<li data-test="ref_link" class="pin-left">
							<a data-track="click" data-track-action="outbound reference" data-track-category="article body" data-track-label="link" href="http://www.ams.org/mathscinet-getitem?mr=${i}${i}${i}${i}${i}" aria-label="View reference ${i} on MathSciNet">MathSciNet</a>
						</li>
						<li class="pin-left pl20">
							<a data-track="click" data-track-action="outbound reference" data-track-category="article body" data-track-label="link" aria-label="Search for reference ${i} on Google Scholar" href="http://scholar.google.com/scholar_lookup?&amp;title=FakeTitle${i}${i}${i}&amp;journal=Fake&amp;volume=1&amp;pages=1-10&amp;publication_year=2015&amp;author=Fake%2CS">
                            	Google Scholar
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
		`).join('');
	}

	return text.replace(/#ref/g, () => {
		refCount++;
		return `<sup><a
	data-track="click" data-track-action="reference anchor" 
	data-track-label="link" data-test="citation-ref" 
	aria-label="Reference ${refCount}" 
	title="Fake ref ${refCount}." 
	href="/articles/12345-12345-12345-4#ref-${refCount}" 
	id="ref-link-section-d2110e453">${refCount}</a></sup>`;
	});
};