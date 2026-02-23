/**
 * Text scramble at word level on hover (hex-style); animates in/out with random character switching.
 * Excludes header, footer, and blog post pages. Call initTextScramble() when DOM is ready.
 */
function initTextScramble() {
    if (!window.matchMedia("(hover: hover)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (document.body && document.body.classList.contains("template-blog")) return;
    var cipherChars = "0123456789abcdef";
    function scramble(str) {
        return str.replace(/[^\s]/g, function() {
            return cipherChars[Math.floor(Math.random() * cipherChars.length)];
        });
    }
    function getTextNodes(el) {
        var nodes = [];
        var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
            acceptNode: function(node) {
                var tag = (node.parentElement && node.parentElement.tagName) || "";
                if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
            }
        });
        var n;
        while ((n = walker.nextNode())) nodes.push(n);
        return nodes;
    }
    function wrapWordsInSpans(el) {
        var textNodes = getTextNodes(el);
        textNodes.forEach(function(textNode) {
            var text = textNode.data;
            var parts = text.split(/(\s+)/);
            var frag = document.createDocumentFragment();
            for (var i = 0; i < parts.length; i++) {
                if (/\S/.test(parts[i])) {
                    var span = document.createElement("span");
                    span.className = "hover-scramble-word";
                    span.textContent = parts[i];
                    span.dataset.original = parts[i];
                    frag.appendChild(span);
                } else {
                    frag.appendChild(document.createTextNode(parts[i]));
                }
            }
            textNode.parentNode.replaceChild(frag, textNode);
        });
    }
    var duration = 900;
    var intervalMs = 60;
    function runScrambleAnimation(span, original, onComplete) {
        var tickCount = 0;
        var maxTicks = Math.ceil(duration / intervalMs);
        span.textContent = scramble(original);
        var t = setInterval(function() {
            tickCount += 1;
            span.textContent = scramble(original);
            if (tickCount >= maxTicks) {
                clearInterval(t);
                if (onComplete) onComplete();
            }
        }, intervalMs);
        return t;
    }
    function clearScrambleTimers(span) {
        if (span._scrambleTimer) {
            clearInterval(span._scrambleTimer);
            span._scrambleTimer = null;
        }
    }
    var selectors = "p, h1, h2, h3, h4, h5, h6, blockquote, li, .uk-text-default, .blog-content";
    var elements = document.querySelectorAll(selectors);
    elements.forEach(function(el) {
        if (el.closest("header") || el.closest("footer")) return;
        wrapWordsInSpans(el);
        el.querySelectorAll(".hover-scramble-word").forEach(function(span) {
            span.addEventListener("mouseenter", function() {
                var self = this;
                var original = self.dataset.original;
                clearScrambleTimers(self);
                self.classList.add("uk-text-muted");
                self._scrambleTimer = runScrambleAnimation(self, original, function() {
                    self._scrambleTimer = null;
                });
            });
            span.addEventListener("mouseleave", function() {
                var self = this;
                var original = self.dataset.original;
                clearScrambleTimers(self);
                self._scrambleTimer = runScrambleAnimation(self, original, function() {
                    self.textContent = original;
                    self.classList.remove("uk-text-muted");
                    self._scrambleTimer = null;
                });
            });
        });
    });
}
