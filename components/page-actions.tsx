'use client';
// ページ操作の「開く」ポップオーバー。
// fumadocs-ui の ViewOptionsPopover は項目が固定で追加できないため、同じ見た目で自前に持ち、
// 「Gemini で開く」を足している（元: node_modules/fumadocs-ui/dist/layouts/shared/page-actions.js）。
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from 'fumadocs-ui/components/ui/popover';
import { usePathname } from 'fumadocs-core/framework';
import { ChevronDown, ExternalLinkIcon, TextIcon } from 'lucide-react';
import { type ComponentProps, type ReactNode, useMemo } from 'react';
import { docsOrigin } from '@/lib/site';

type Item = { title: string; href: string; icon: ReactNode };

function ViewOptionsPopover({
  markdownUrl,
  ...props
}: ComponentProps<'button'> & { markdownUrl: string }) {
  const pathname = usePathname();
  const items = useMemo<Item[]>(() => {
    // 静的書き出し時は window が無いので本番オリジンで組み立てる
    const pageUrl =
      typeof window === 'undefined'
        ? new URL(pathname, docsOrigin)
        : new URL(pathname, window.location.origin);
    const q = `${pageUrl} を読んでください。この内容について質問したいです。`;

    return [
      {
        title: 'Markdown で表示',
        href: markdownUrl,
        icon: <TextIcon />,
      },
      {
        title: 'Scira AI で開く',
        href: `https://scira.ai/?${new URLSearchParams({ q })}`,
        icon: <SciraIcon />,
      },
      {
        title: 'ChatGPT で開く',
        href: `https://chatgpt.com/?${new URLSearchParams({ prompt: q, hints: 'search' })}`,
        icon: <OpenAIIcon />,
      },
      {
        title: 'Claude で開く',
        href: `https://claude.ai/new?${new URLSearchParams({ q })}`,
        icon: <AnthropicIcon />,
      },
      {
        // gemini.google.com はプロンプトを URL で受け取れないので、
        // Google 公式の入口 google.ai（Gemini ベースの AI モードに q 付きで転送される）を使う
        title: 'Gemini で開く',
        href: `https://google.ai/?${new URLSearchParams({ q })}`,
        icon: <GeminiIcon />,
      },
      {
        title: 'Perplexity で開く',
        href: `https://www.perplexity.ai/search?${new URLSearchParams({ q })}`,
        icon: <PerplexityIcon />,
      },
      {
        title: 'Felo で開く',
        href: `https://felo.ai/search?${new URLSearchParams({ q })}`,
        icon: <FeloIcon />,
      },
      {
        title: 'Cursor で開く',
        href: `https://cursor.com/link/prompt?${new URLSearchParams({ text: q })}`,
        icon: <CursorIcon />,
      },
    ];
  }, [markdownUrl, pathname]);

  return (
    <Popover>
      <PopoverTrigger
        {...props}
        className={[
          buttonVariants({ color: 'secondary', size: 'sm' }),
          'gap-2 data-[state=open]:bg-fd-accent data-[state=open]:text-fd-accent-foreground',
          props.className ?? '',
        ].join(' ')}
      >
        {props.children ?? '開く'}
        <ChevronDown className="size-3.5 text-fd-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            rel="noreferrer noopener"
            target="_blank"
            className="text-sm p-2 rounded-lg inline-flex items-center gap-2 hover:text-fd-accent-foreground hover:bg-fd-accent [&_svg]:size-4"
          >
            {item.icon}
            {item.title}
            <ExternalLinkIcon className="text-fd-muted-foreground size-3.5 ms-auto" />
          </a>
        ))}
      </PopoverContent>
    </Popover>
  );
}

// 各サービスのロゴ（Simple Icons）
function GeminiIcon() {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <title>Google Gemini</title>
      <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" />
    </svg>
  );
}

function PerplexityIcon() {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <title>Perplexity</title>
      <path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z" />
    </svg>
  );
}

// felo.ai/icon.svg の虫めがね部分を単色にしたもの
function FeloIcon() {
  return (
    <svg role="img" viewBox="40 40 160 160" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <title>Felo</title>
      <path d="M187.028 168.455C185.988 167.415 184.815 166.584 183.564 165.968C183.552 165.96 183.538 165.954 183.525 165.948C180.593 164.535 178.57 161.536 178.57 158.062C178.57 156.58 178.938 155.183 179.589 153.96C179.667 153.814 179.751 153.668 179.837 153.526C179.843 153.52 179.847 153.514 179.849 153.506C185.644 143.318 188.951 131.532 188.951 118.974C188.951 80.3288 157.621 49.0003 118.975 49.0003C111.67 49.0003 104.624 50.1208 98.0034 52.1978C87.1004 55.6193 77.346 61.6381 69.4663 69.5277C69.4444 69.5478 69.4204 69.5718 69.3983 69.5938L69.3962 69.5958C65.5184 73.4896 62.0949 77.8376 59.2156 82.5538C57.9289 84.6588 56.7505 86.8377 55.69 89.0828C51.4001 98.1469 49.001 108.28 49.001 118.974C49.001 149.562 68.626 175.566 95.9704 185.081C103.176 187.588 110.915 188.95 118.975 188.95C126.564 188.95 133.872 187.742 140.715 185.509C145.161 184.056 149.411 182.169 153.415 179.902C153.423 179.898 153.431 179.894 153.439 179.888C153.633 179.766 153.831 179.652 154.031 179.548C156.024 178.504 158.267 178.302 160.32 178.844C162.381 179.388 164.252 180.685 165.48 182.632C165.653 182.904 165.807 183.18 165.945 183.462C165.957 183.49 165.971 183.518 165.985 183.546C166.603 184.797 167.433 185.969 168.474 187.01C169.5 188.036 170.655 188.857 171.885 189.471C176.798 191.928 182.93 191.108 187.028 187.01C192.152 181.885 192.153 173.58 187.028 168.455ZM157.821 139.088C155.912 142.77 153.495 146.145 150.662 149.12C142.696 157.492 131.445 162.711 118.975 162.711C113.076 162.711 107.452 161.544 102.317 159.427C86.426 152.874 75.241 137.231 75.241 118.975C75.241 113.558 76.2255 108.372 78.0263 103.586C78.1022 103.386 78.1783 103.185 78.2564 102.987C83.4908 89.6672 95.0722 79.5366 109.277 76.3192C112.396 75.6128 115.641 75.2407 118.975 75.2407C143.13 75.2407 162.709 94.8217 162.709 118.975C162.709 126.226 160.944 133.067 157.821 139.088Z" />
    </svg>
  );
}

function OpenAIIcon() {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <title>OpenAI</title>
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  );
}

function AnthropicIcon() {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <title>Anthropic</title>
      <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
    </svg>
  );
}

function CursorIcon() {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <title>Cursor</title>
      <path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23" />
    </svg>
  );
}

function SciraIcon() {
  return (
    <svg viewBox="0 0 910 934" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>Scira AI</title>
      <path d="M647.664 197.775C569.13 189.049 525.5 145.419 516.774 66.8849C508.048 145.419 464.418 189.049 385.884 197.775C464.418 206.501 508.048 250.131 516.774 328.665C525.5 250.131 569.13 206.501 647.664 197.775Z" fill="currentColor" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" />
      <path d="M516.774 304.217C510.299 275.491 498.208 252.087 480.335 234.214C462.462 216.341 439.058 204.251 410.333 197.775C439.059 191.3 462.462 179.209 480.335 161.336C498.208 143.463 510.299 120.06 516.774 91.334C523.25 120.059 535.34 143.463 553.213 161.336C571.086 179.209 594.49 191.3 623.216 197.775C594.49 204.251 571.086 216.341 553.213 234.214C535.34 252.087 523.25 275.491 516.774 304.217Z" fill="currentColor" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" />
      <path d="M857.5 508.116C763.259 497.644 710.903 445.288 700.432 351.047C689.961 445.288 637.605 497.644 543.364 508.116C637.605 518.587 689.961 570.943 700.432 665.184C710.903 570.943 763.259 518.587 857.5 508.116Z" stroke="currentColor" strokeWidth="20" strokeLinejoin="round" />
      <path d="M700.432 615.957C691.848 589.05 678.575 566.357 660.383 548.165C642.191 529.973 619.499 516.7 592.593 508.116C619.499 499.533 642.191 486.258 660.383 468.066C678.575 449.874 691.848 427.181 700.432 400.274C709.015 427.181 722.289 449.874 740.481 468.066C758.673 486.258 781.365 499.533 808.271 508.116C781.365 516.7 758.673 529.973 740.481 548.165C722.289 566.357 709.015 589.05 700.432 615.957Z" stroke="currentColor" strokeWidth="20" strokeLinejoin="round" />
      <path d="M889.949 121.237C831.049 114.692 798.326 81.9698 791.782 23.0692C785.237 81.9698 752.515 114.692 693.614 121.237C752.515 127.781 785.237 160.504 791.782 219.404C798.326 160.504 831.049 127.781 889.949 121.237Z" fill="currentColor" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" />
      <path d="M791.782 196.795C786.697 176.937 777.869 160.567 765.16 147.858C752.452 135.15 736.082 126.322 716.226 121.237C736.082 116.152 752.452 107.324 765.16 94.6152C777.869 81.9065 786.697 65.5368 791.782 45.6797C796.867 65.5367 805.695 81.9066 818.403 94.6152C831.112 107.324 847.481 116.152 867.338 121.237C847.481 126.322 831.112 135.15 818.403 147.858C805.694 160.567 796.867 176.937 791.782 196.795Z" fill="currentColor" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" />
      <path d="M760.632 764.337C720.719 814.616 669.835 855.1 611.872 882.692C553.91 910.285 490.404 924.255 426.213 923.533C362.022 922.812 298.846 907.419 241.518 878.531C184.19 849.643 134.228 808.026 95.4548 756.863C56.6815 705.7 30.1238 646.346 17.8129 583.343C5.50207 520.339 7.76433 455.354 24.4266 393.359C41.089 331.364 71.7099 274.001 113.947 225.658C156.184 177.315 208.919 139.273 268.117 114.442" stroke="currentColor" strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export { ViewOptionsPopover };
